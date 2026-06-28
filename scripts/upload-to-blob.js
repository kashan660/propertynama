/**
 * Move every image under public/uploads to Vercel Blob, then rewrite all
 * references (DB Page/Blog/SiteSetting fields + inline <img> src) and the
 * committed seed-data.json from "/uploads/..." to the returned Blob URL.
 *
 * Requires BLOB_READ_WRITE_TOKEN (Vercel project > Storage > Blob store).
 * Idempotent: a url-map is cached in scripts/blob-map.json so re-runs skip
 * already-uploaded files. After a clean run you can delete public/uploads.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..." node scripts/upload-to-blob.js
 *   BLOB_READ_WRITE_TOKEN="..." node scripts/upload-to-blob.js --rewrite-only
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');
const { createSequelize } = require('../lib/db');

const ROOT = path.join(__dirname, '..');
const UPLOADS = path.join(ROOT, 'public', 'uploads');
const MAP_FILE = path.join(__dirname, 'blob-map.json');
const SEED_FILE = path.join(__dirname, 'seed-data.json');

const REWRITE_ONLY = process.argv.includes('--rewrite-only');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const CONCURRENCY = 12;

const CT = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function loadMap() {
  try { return JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')); } catch (_) { return {}; }
}

async function uploadAll(map) {
  if (!TOKEN) { console.error('ERROR: BLOB_READ_WRITE_TOKEN is not set.'); process.exit(1); }
  const files = walk(UPLOADS);
  const pending = files.filter(f => {
    const key = '/uploads/' + path.relative(UPLOADS, f).split(path.sep).join('/');
    return !map[key];
  });
  console.log(`${files.length} files, ${pending.length} to upload, ${files.length - pending.length} cached`);

  let done = 0, failed = 0;
  let idx = 0;
  async function worker() {
    while (idx < pending.length) {
      const f = pending[idx++];
      const rel = path.relative(UPLOADS, f).split(path.sep).join('/');
      const key = '/uploads/' + rel;
      const pathname = 'uploads/' + rel;
      try {
        const body = fs.readFileSync(f);
        const ct = CT[path.extname(f).toLowerCase()] || 'application/octet-stream';
        const res = await put(pathname, body, { access: 'public', token: TOKEN,
          addRandomSuffix: false, contentType: ct });
        map[key] = res.url;
        if (++done % 100 === 0) {
          fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 0));
          console.log(`  uploaded ${done}/${pending.length}`);
        }
      } catch (e) {
        failed++; console.warn('  ! failed', key, e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 0));
  console.log(`upload complete: ${done} ok, ${failed} failed, map has ${Object.keys(map).length} entries`);
  if (failed) { console.error('Some uploads failed — fix and re-run before rewriting.'); process.exit(1); }
}

// Replace every "/uploads/..." occurrence in a string with its Blob URL.
function rewriteStr(s, map) {
  if (!s) return s;
  return s.replace(/\/uploads\/[^\s"')]+/g, m => map[m] || m);
}

async function rewriteDb(map) {
  const s = createSequelize();

  let changed = 0;
  for (const [tbl, cols] of [['Pages', ['image', 'content', 'video', 'summary']],
                             ['Blogs', ['image', 'content', 'video', 'excerpt']]]) {
    const [rows] = await s.query(`SELECT * FROM ${tbl}`);
    for (const r of rows) {
      const sets = [], repl = [];
      for (const c of cols) {
        if (r[c] == null) continue;
        const nv = rewriteStr(String(r[c]), map);
        if (nv !== r[c]) { sets.push(`${c}=?`); repl.push(nv); }
      }
      if (sets.length) { repl.push(r.id); await s.query(`UPDATE ${tbl} SET ${sets.join(',')} WHERE id=?`, { replacements: repl }); changed++; }
    }
  }
  // SiteSettings may hold a logo / og image path
  try {
    const [settings] = await s.query('SELECT * FROM SiteSettings');
    for (const r of settings) {
      const nv = rewriteStr(String(r.value || ''), map);
      if (nv !== r.value) { await s.query('UPDATE SiteSettings SET value=? WHERE id=?', { replacements: [nv, r.id] }); changed++; }
    }
  } catch (_) {}
  console.log(`DB rows rewritten: ${changed}`);
  await s.close();
}

function rewriteSeed(map) {
  if (!fs.existsSync(SEED_FILE)) return;
  let raw = fs.readFileSync(SEED_FILE, 'utf8');
  // The seed is JSON; rewrite by walking values so we don't touch unrelated text.
  const data = JSON.parse(raw);
  const walkVal = v => {
    if (typeof v === 'string') return rewriteStr(v, map);
    if (Array.isArray(v)) return v.map(walkVal);
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) v[k] = walkVal(v[k]); return v; }
    return v;
  };
  walkVal(data);
  fs.writeFileSync(SEED_FILE, JSON.stringify(data));
  console.log('seed-data.json rewritten');
}

async function main() {
  const map = loadMap();
  if (!REWRITE_ONLY) await uploadAll(map);
  else console.log(`rewrite-only: using cached map (${Object.keys(map).length} entries)`);
  await rewriteDb(map);
  rewriteSeed(map);
  console.log('\nDone. Verify the app, then delete public/uploads to shrink the repo.');
}

main().catch(e => { console.error(e); process.exit(1); });
