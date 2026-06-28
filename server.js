const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

dotenv.config();

const { createSequelize } = require('./lib/db');
const cache = require('./lib/cache');

// TTLs (ms) for the public read paths — bounds staleness against a remote DB.
const TTL_SETTINGS = 5 * 60 * 1000;
const TTL_LIST = 2 * 60 * 1000;
const TTL_ITEM = 2 * 60 * 1000;

const app = express();
const port = process.env.PORT || 3000;

const sequelize = createSequelize();

const upload = multer({ storage: multer.memoryStorage() });

function toDataUri(file) {
  if (!file) return null;
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'propertynama-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

const SiteSetting = sequelize.define('SiteSetting', {
  key: { type: DataTypes.STRING, allowNull: false, unique: true },
  value: { type: DataTypes.TEXT, allowNull: false }
});

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

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'admin' }
});

sequelize.sync({ alter: true }).then(async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? null : 'admin123');

    if (adminPassword) {
      const existing = await User.findOne({ where: { username: adminUsername } });
      if (!existing) {
        await User.create({
          username: adminUsername,
          password: bcrypt.hashSync(adminPassword, 10),
          role: 'admin'
        });
      } else if (!bcrypt.compareSync(adminPassword, existing.password)) {
        await existing.update({ password: bcrypt.hashSync(adminPassword, 10) });
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.warn('Production admin credentials are not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD to enable admin login.');
    }

    const settings = [
      ['site_name', 'Property Nama'],
      ['site_title', 'Premium Real Estate & Property Solutions'],
      ['whatsapp', '+923001234567'],
      ['facebook', 'https://facebook.com'],
      ['instagram', 'https://instagram.com'],
      ['twitter', 'https://twitter.com'],
      ['linkedin', 'https://linkedin.com'],
      ['meta_description', 'Luxury property solutions in Pakistan'],
      ['meta_keywords', 'property, real estate, pakistan, investment']
    ];

    for (const [key, value] of settings) {
      const found = await SiteSetting.findOne({ where: { key } });
      if (!found) await SiteSetting.create({ key, value });
    }
  } catch (seedErr) {
    console.warn('Seed warning:', seedErr.message);
  }

  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}).catch(err => console.error(err));

function getSettingMap() {
  return cache.cached('settings', TTL_SETTINGS, async () => {
    const settings = await SiteSetting.findAll({ raw: true });
    return Object.fromEntries(settings.map(s => [s.key, s.value]));
  });
}
function getPublishedPages() {
  return cache.cached('pages:published', TTL_LIST, () =>
    Page.findAll({ where: { isPublished: true }, order: [['createdAt', 'DESC']], raw: true }));
}
function getPublishedBlogs() {
  return cache.cached('blogs:published', TTL_LIST, () =>
    Blog.findAll({ where: { isPublished: true }, order: [['createdAt', 'DESC']], raw: true }));
}

app.get('/', async (req, res) => {
  const [settingMap, pages, blogs] = await Promise.all([getSettingMap(), getPublishedPages(), getPublishedBlogs()]);
  res.render('home', { settingMap, pages, blogs, user: req.session.user });
});

app.get('/page/:slug', async (req, res) => {
  const [page, settingMap] = await Promise.all([
    cache.cached(`page:${req.params.slug}`, TTL_ITEM, () =>
      Page.findOne({ where: { slug: req.params.slug, isPublished: true }, raw: true })),
    getSettingMap()
  ]);
  if (!page) return res.status(404).send('Page not found');
  res.render('page', { page, settingMap, user: req.session.user });
});

app.get('/blog/:slug', async (req, res) => {
  const [blog, settingMap] = await Promise.all([
    cache.cached(`blog:${req.params.slug}`, TTL_ITEM, () =>
      Blog.findOne({ where: { slug: req.params.slug, isPublished: true }, raw: true })),
    getSettingMap()
  ]);
  if (!blog) return res.status(404).send('Blog not found');
  res.render('blog', { blog, settingMap, user: req.session.user });
});

app.get('/blogs', async (req, res) => {
  const [blogs, settingMap] = await Promise.all([getPublishedBlogs(), getSettingMap()]);
  res.render('blogs', { blogs, settingMap, user: req.session.user });
});

app.get('/login', (req, res) => res.render('login', { error: null, user: req.session.user }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('login', { error: 'Username and password are required', user: null });
  }

  const user = await User.findOne({ where: { username } });
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    return res.redirect('/admin');
  }
  res.render('login', { error: 'Invalid credentials', user: null });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

function ensureAdmin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

app.get('/admin', ensureAdmin, async (req, res) => {
  const [settings, pages, blogs] = await Promise.all([
    SiteSetting.findAll({ raw: true }),
    Page.findAll({ order: [['createdAt', 'DESC']] }),
    Blog.findAll({ order: [['createdAt', 'DESC']] })
  ]);
  const settingMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
  res.render('admin', { settingMap, pages, blogs, user: req.session.user });
});

app.post('/admin/settings', ensureAdmin, async (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    await SiteSetting.upsert({ key, value });
  }
  cache.clear();
  res.redirect('/admin');
});

app.post('/admin/pages', ensureAdmin, upload.single('image'), async (req, res) => {
  const { slug, title, content, video, summary, template, isPublished } = req.body;
  await Page.create({
    slug,
    title,
    content,
    video,
    summary,
    template,
    image: toDataUri(req.file),
    isPublished: isPublished === 'on'
  });
  cache.clear();
  res.redirect('/admin');
});

app.post('/admin/blogs', ensureAdmin, upload.single('image'), async (req, res) => {
  const { slug, title, excerpt, content, video, category, isPublished } = req.body;
  await Blog.create({
    slug,
    title,
    excerpt,
    content,
    video,
    category,
    image: toDataUri(req.file),
    isPublished: isPublished === 'on'
  });
  cache.clear();
  res.redirect('/admin');
});

app.post('/admin/pages/:id/edit', ensureAdmin, upload.single('image'), async (req, res) => {
  const page = await Page.findByPk(req.params.id);
  if (!page) return res.status(404).send('Page not found');
  const { slug, title, content, video, summary, template, isPublished } = req.body;
  await page.update({
    slug,
    title,
    content,
    video,
    summary,
    template,
    image: toDataUri(req.file) || page.image,
    isPublished: isPublished === 'on'
  });
  cache.clear();
  res.redirect('/admin');
});

app.post('/admin/blogs/:id/edit', ensureAdmin, upload.single('image'), async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) return res.status(404).send('Blog not found');
  const { slug, title, excerpt, content, video, category, isPublished } = req.body;
  await blog.update({
    slug,
    title,
    excerpt,
    content,
    video,
    category,
    image: toDataUri(req.file) || blog.image,
    isPublished: isPublished === 'on'
  });
  cache.clear();
  res.redirect('/admin');
});

app.get('/admin/pages/:id/delete', ensureAdmin, async (req, res) => {
  await Page.destroy({ where: { id: req.params.id } });
  cache.clear();
  res.redirect('/admin');
});

app.get('/admin/blogs/:id/delete', ensureAdmin, async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  cache.clear();
  res.redirect('/admin');
});
