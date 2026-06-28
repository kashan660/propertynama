/**
 * Export the migrated content (Pages, Blogs, SiteSettings) from the local
 * database into scripts/seed-data.json so it can be committed and re-seeded
 * into any database (e.g. production Postgres) without the original mirror.
 *
 * Usage: node scripts/export-content.js
 */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const ROOT = path.join(__dirname, '..');

async function main() {
  const s = new Sequelize({ dialect: 'sqlite', logging: false,
    storage: process.env.DB_STORAGE ? path.join(ROOT, process.env.DB_STORAGE) : path.join(ROOT, 'database.sqlite') });

  const [pages] = await s.query('SELECT slug,title,content,image,video,summary,template,isPublished FROM Pages');
  const [blogs] = await s.query('SELECT slug,title,excerpt,content,image,video,category,isPublished FROM Blogs');
  const [settings] = await s.query('SELECT key,value FROM SiteSettings');

  const out = { pages, blogs, settings };
  const file = path.join(__dirname, 'seed-data.json');
  fs.writeFileSync(file, JSON.stringify(out));
  const mb = (fs.statSync(file).size / 1048576).toFixed(2);
  console.log(`exported ${pages.length} pages, ${blogs.length} blogs, ${settings.length} settings -> seed-data.json (${mb} MB)`);
  await s.close();
}
main().catch(e => { console.error(e); process.exit(1); });
