/**
 * Seed a database from scripts/seed-data.json. Works against MySQL, Postgres,
 * or local SQLite depending on the env (see lib/db.js).
 * Idempotent: upserts by slug / key, safe to run repeatedly.
 *
 * Hostinger MySQL:
 *   DB_DIALECT=mysql DB_HOST=srv1475.hstgr.io DB_NAME=... DB_USER=... \
 *   DB_PASSWORD=... node scripts/seed.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const { createSequelize } = require('../lib/db');

async function main() {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));

  const sequelize = createSequelize();

  const SiteSetting = sequelize.define('SiteSetting', {
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.TEXT, allowNull: false }
  });
  const Page = sequelize.define('Page', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT }, video: { type: DataTypes.STRING },
    summary: { type: DataTypes.TEXT }, template: { type: DataTypes.STRING, defaultValue: 'default' },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  const Blog = sequelize.define('Blog', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    excerpt: { type: DataTypes.STRING }, content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT }, video: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING }, isPublished: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  await sequelize.sync();

  for (const s of data.settings) await SiteSetting.upsert(s);
  let pn = 0, bn = 0;
  for (const p of data.pages) { const [, c] = await Page.findOrCreate({ where: { slug: p.slug }, defaults: p }); if (!c) await Page.update(p, { where: { slug: p.slug } }); pn++; }
  for (const b of data.blogs) { const [, c] = await Blog.findOrCreate({ where: { slug: b.slug }, defaults: b }); if (!c) await Blog.update(b, { where: { slug: b.slug } }); bn++; }

  console.log(`seeded ${pn} pages, ${bn} blogs, ${data.settings.length} settings into ${sequelize.getDialect()}`);
  await sequelize.close();
}
main().catch(e => { console.error(e); process.exit(1); });
