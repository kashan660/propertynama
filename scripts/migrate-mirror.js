/**
 * Migrate the HTTrack WordPress mirror (propertynaama.com/) into the CMS database.
 *
 * For each post folder it extracts: title, summary, publish date, featured image,
 * clean body HTML (headings + paragraphs + content images) and inserts a Page
 * (property listing) or Blog (article) row, keyed by slug (idempotent upsert).
 *
 * Only images actually referenced by the kept content are copied into public/uploads,
 * preferring the full-size original over WordPress -WIDTHxHEIGHT resize variants.
 *
 * Usage:
 *   node scripts/migrate-mirror.js --dry --limit=5   # preview, no writes
 *   node scripts/migrate-mirror.js                   # full run
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { Sequelize, DataTypes } = require('sequelize');

const ROOT = path.join(__dirname, '..');
const MIRROR = path.join(ROOT, 'propertynaama.com');
const UPLOADS_SRC = path.join(MIRROR, 'wp-content', 'uploads');
const PUBLIC_UPLOADS = path.join(ROOT, 'public', 'uploads');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const limitArg = args.find(a => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;

// Folders inside the mirror that are NOT content posts.
const SKIP = new Set([
  'wp-content', 'wp-includes', 'wp-admin', 'wp-json', 'feed', 'comments',
  'category', 'tag', 'tags', 'author', 'page', 'cdn-cgi', 'blogs', 'blogs-2',
  'xmlrpc.php', 'wp-login.php', 'sitemap', 'amp', 'embed', 'search'
]);

// Slug keywords that mark a property listing (-> Page). Everything else -> Blog.
const PROPERTY_RX = /(marla|kanal|plot|apartment|house|flat|for-sale|commercial|farmhouse|farm-house|booking|payment-plan|residential|villa|shop|office|files?|installments?)/i;

const SITE_SUFFIX_RX = /\s*[-|–»]\s*(Property\s*Naama|Propertynaama|Property Nama).*$/i;

function siteName() { return 'Property Naama'; }

function cleanTitle(t) {
  return (t || '').replace(SITE_SUFFIX_RX, '').replace(/\s+/g, ' ').trim();
}

// Resolve an <img>/og:image URL to a path relative to wp-content/uploads, or null.
function toUploadRel(src) {
  if (!src) return null;
  let s = src.split('?')[0].split(' ')[0].trim(); // drop querystring / srcset extras
  const i = s.indexOf('wp-content/uploads/');
  if (i === -1) return null;
  return s.slice(i + 'wp-content/uploads/'.length);
}

// Strip a WordPress -WIDTHxHEIGHT resize suffix to get the original filename.
function stripResize(rel) {
  return rel.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, '$1');
}

function isJunkImage(rel) {
  return /(logo|favicon|cropped-property-naama|placeholder|spinner|loading|avatar|gravatar|icon[-_.]|emoji)/i.test(rel);
}

const copied = new Set();
let copiedBytes = 0;

// Copy a referenced upload into public/uploads (preferring the original) and
// return the public path ("/uploads/...") to store, or null if unavailable.
function keepImage(src) {
  const rel0 = toUploadRel(src);
  if (!rel0 || isJunkImage(rel0)) return null;

  // Prefer the full-size original over a resize variant when it exists on disk.
  const candidates = [stripResize(rel0), rel0];
  let rel = null;
  for (const c of candidates) {
    if (fs.existsSync(path.join(UPLOADS_SRC, c))) { rel = c; break; }
  }
  if (!rel) return null;

  const dest = path.join(PUBLIC_UPLOADS, rel);
  if (!copied.has(rel)) {
    if (!DRY) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(path.join(UPLOADS_SRC, rel), dest);
    }
    copied.add(rel);
    try { copiedBytes += fs.statSync(path.join(UPLOADS_SRC, rel)).size; } catch (_) {}
  }
  return '/uploads/' + rel.split(path.sep).join('/');
}

function extract(file, slug) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));

  const title = cleanTitle($('meta[property="og:title"]').attr('content') || $('title').text());
  const summary = ($('meta[name="description"]').attr('content') || '').replace(/\s+/g, ' ').trim();
  const date = $('meta[property="article:published_time"]').attr('content') || null;
  const featured = keepImage($('meta[property="og:image"]').attr('content'));

  // Remove site chrome so we are left with the article body.
  $('header, footer, nav, script, style, noscript, form, iframe, .elementor-location-header, ' +
    '.elementor-location-footer, .elementor-menu-toggle, .breadcrumbs, .related-posts, ' +
    '[class*="menu"], [class*="sidebar"], [class*="widget-area"], [id*="comments"]').remove();

  // Collect headings, paragraphs and content images in document order.
  const seen = new Set();
  const blocks = [];
  $('h1, h2, h3, h4, p, img').each((_, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'img') {
      const pub = keepImage($(el).attr('data-src') || $(el).attr('src') || $(el).attr('data-lazy-src'));
      if (pub && !seen.has(pub)) { seen.add(pub); blocks.push(`<img src="${pub}" alt="${title.replace(/"/g, '')}">`); }
      return;
    }
    let txt = $(el).text().replace(/\s+/g, ' ').trim();
    if (!txt) return;
    if (tag === 'p' && txt.length < 30) return;          // skip tiny boilerplate lines
    if (seen.has(txt)) return;
    seen.add(txt);
    const safe = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    blocks.push(tag === 'p' ? `<p>${safe}</p>` : `<h2>${safe}</h2>`);
  });

  // Drop the featured image if it also appears inline (avoid duplicate at top).
  let content = blocks.join('\n');
  const isBlog = !PROPERTY_RX.test(slug);
  return { slug, title, summary, date, image: featured, content, isBlog,
           textLen: blocks.filter(b => b.startsWith('<p')).reduce((n, b) => n + b.length, 0) };
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
  const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, { dialect: 'postgres', logging: false,
        dialectOptions: { ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true'
          ? { require: true, rejectUnauthorized: false } : false } })
    : new Sequelize({ dialect: 'sqlite', logging: false,
        storage: process.env.DB_STORAGE ? path.join(ROOT, process.env.DB_STORAGE) : path.join(ROOT, 'database.sqlite') });

  const Page = sequelize.define('Page', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT },
    video: { type: DataTypes.STRING },
    summary: { type: DataTypes.TEXT },
    template: { type: DataTypes.STRING, defaultValue: 'default' },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  const Blog = sequelize.define('Blog', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    excerpt: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT },
    video: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  if (!DRY) await sequelize.sync();

  const entries = fs.readdirSync(MIRROR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !SKIP.has(d.name) && !d.name.startsWith('.'))
    .map(d => d.name)
    .filter(name => fs.existsSync(path.join(MIRROR, name, 'index.html')))
    .slice(0, LIMIT);

  let pages = 0, blogs = 0, skipped = 0;
  const samples = [];
  for (const slug of entries) {
    let rec;
    try { rec = extract(path.join(MIRROR, slug, 'index.html'), slug); }
    catch (e) { skipped++; console.warn('  ! parse failed', slug, e.message); continue; }

    if (!rec.title || (!rec.content && !rec.image)) { skipped++; continue; }
    if (!rec.content) rec.content = `<p>${(rec.summary || rec.title).replace(/</g, '&lt;')}</p>`;

    if (samples.length < 5) samples.push({ slug: rec.slug, title: rec.title, type: rec.isBlog ? 'Blog' : 'Page',
      img: rec.image, bodyChars: rec.content.length });

    if (!DRY) {
      if (rec.isBlog) {
        const [row, created] = await Blog.findOrCreate({ where: { slug: rec.slug },
          defaults: { title: rec.title, excerpt: rec.summary?.slice(0, 255) || null, content: rec.content,
            image: rec.image, category: 'Blog', isPublished: true } });
        if (!created) await row.update({ title: rec.title, excerpt: rec.summary?.slice(0, 255) || null,
          content: rec.content, image: rec.image });
      } else {
        const [row, created] = await Page.findOrCreate({ where: { slug: rec.slug },
          defaults: { title: rec.title, summary: rec.summary || null, content: rec.content,
            image: rec.image, template: 'default', isPublished: true } });
        if (!created) await row.update({ title: rec.title, summary: rec.summary || null,
          content: rec.content, image: rec.image });
      }
    }
    rec.isBlog ? blogs++ : pages++;
  }

  console.log('\n--- migration summary ---');
  console.log(DRY ? '(DRY RUN — no writes)' : '(committed to DB)');
  console.log('pages (property):', pages);
  console.log('blogs (articles):', blogs);
  console.log('skipped         :', skipped);
  console.log('images copied   :', copied.size, `(${(copiedBytes / 1048576).toFixed(1)} MB)`);
  console.log('\nsamples:');
  for (const s of samples) console.log(' ', s.type, '|', s.slug, '| img:', s.img, '| body:', s.bodyChars, 'ch');

  if (!DRY) await sequelize.close();
}

main().catch(e => { console.error(e); process.exit(1); });
