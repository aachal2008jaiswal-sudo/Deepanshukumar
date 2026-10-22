require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ROOT = __dirname;

// SAB WRITABLE FOLDER /tmp ME
const DATA_DIR = path.join('/tmp', 'data');
const UPLOADS_DIR = path.join('/tmp', 'uploads');
const DB = path.join(DATA_DIR, 'db.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(DB)) fs.writeFileSync(DB, '{}');
}
ensureFile();

function readDB() {
  ensureFile();
  try { return JSON.parse(fs.readFileSync(DB, 'utf8') || '{}'); } catch { return {}; }
}
function writeDB(d) { ensureFile(); fs.writeFileSync(DB, JSON.stringify(d, null, 2)); }

async function ensureAdmin() {
  const db = readDB();
  if (!db.users) db.users = [];
  if (!db.users.find(u => u.role === 'admin')) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    db.users.push({ id: 'admin', username: process.env.ADMIN_USERNAME || 'admin', password: hash, role: 'admin' });
    writeDB(db);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(ROOT, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(ROOT, 'views'));

// multer ko bhi /tmp par set kiya
const storage = multer.diskStorage({
  destination: (req, file, cb) => { ensureFile(); cb(null, UPLOADS_DIR); },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- Aapke saare routes yahan se waise hi rahenge ---
// Agar aapke purane server.js me routes the to unko yahan paste karna,
// par filhal ye basic routes se site chal jayegi

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Yahan se neeche aapke baaki ke routes copy karo agar the

ensureAdmin();
module.exports = app;
if (require.main === module) {
  app.listen(PORT,()=>console.log(`Education Coaching Centre running on http://localhost:${PORT}`));
}
