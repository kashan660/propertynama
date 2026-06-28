/**
 * Seed a database from scripts/seed-data.json. Works against Postgres
 * (when DATABASE_URL / POSTGRES_URL is set) or local SQLite otherwise.
 * Idempotent: upserts by slug / key, safe to run repeatedly.
 *
 * Production (Postgres):
 *   DATABASE_URL="postgres://..." NODE_ENV=production node scripts/seed.js
 */
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const ROOT = path.join(__dirname, '..');

async function main() {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
  const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, { dialect: 'postgres', logging: false,
        dialectOptions: { ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true'
          ? { require: true, rejectUnauthorized: false } : false } })
    : new Sequelize({ dialect: 'sqlite', logging: false,
        storage: process.env.DB_STORAGE ? path.join(ROOT, process.env.DB_STORAGE) : path.join(ROOT, 'database.sqlite') });

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

  console.log(`seeded ${pn} pages, ${bn} blogs, ${data.settings.length} settings into ${databaseUrl ? 'Postgres' : 'SQLite'}`);
  await sequelize.close();
}
main().catch(e => { console.error(e); process.exit(1); });
