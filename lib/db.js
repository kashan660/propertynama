/**
 * Single source of truth for the database connection, shared by the app
 * (server.js) and the maintenance scripts (seed, export, blob upload).
 *
 * Selection order:
 *   1. Discrete vars  DB_DIALECT=mysql|postgres + DB_HOST/DB_NAME/DB_USER/DB_PASSWORD
 *      (preferred — avoids URL-encoding passwords that contain + / @ etc.)
 *   2. A connection URL in DATABASE_URL / POSTGRES_URL / MYSQL_URL
 *      (dialect inferred from the mysql:// or postgres:// scheme)
 *   3. Local SQLite fallback (development)
 *
 * SSL: Postgres-on-Vercel needs it; Hostinger MySQL generally does not.
 * Force it on/off with DB_SSL=true|false.
 */
const path = require('path');
const { Sequelize } = require('sequelize');

function sslOption(dialect) {
  const want = process.env.DB_SSL === 'true' ||
    (process.env.DB_SSL !== 'false' && dialect === 'postgres' && process.env.NODE_ENV === 'production');
  return want ? { ssl: { require: true, rejectUnauthorized: false } } : {};
}

function createSequelize() {
  const dialectEnv = (process.env.DB_DIALECT || '').toLowerCase();

  // 1. Discrete host/user/password config
  if ((dialectEnv === 'mysql' || dialectEnv === 'postgres') && process.env.DB_HOST) {
    return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : (dialectEnv === 'mysql' ? 3306 : 5432),
      dialect: dialectEnv,
      logging: false,
      dialectOptions: sslOption(dialectEnv),
      pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
      define: dialectEnv === 'mysql' ? { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' } : {},
    });
  }

  // 2. Connection URL
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL || process.env.MYSQL_URL;
  if (url) {
    const dialect = url.startsWith('mysql') ? 'mysql' : 'postgres';
    return new Sequelize(url, {
      dialect,
      logging: false,
      dialectOptions: sslOption(dialect),
      pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
    });
  }

  // 3. SQLite fallback
  const ROOT = path.join(__dirname, '..');
  return new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: process.env.DB_STORAGE ? path.join(ROOT, process.env.DB_STORAGE) : path.join(ROOT, 'database.sqlite'),
  });
}

module.exports = { createSequelize };
