const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = Number(process.env.PORT) || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_change_me_in_production";

// اختيار مسار قابل للكتابة في بيئة Serverless (Vercel)
const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
const dbDir = isVercel ? "/tmp" : __dirname;
const dbPath = path.join(dbDir, "portfolio.sqlite");

const db = new sqlite3.Database(dbPath);

// إنشاء الجدول عند بدء التشغيل
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
});

// الوسائط (Middleware)
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// التحقق من المدخلات
const validCredentials = (email, password) =>
  typeof email === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
  typeof password === "string" &&
  password.length >= 8 &&
  password.length <= 128;

// مسار تجريبي للاختبار عند فتح الرابط الرئيسي
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running successfully on Vercel!");
});

// 1. مسار إنشاء حساب جديد (Register)
app.post("/api/auth/register", async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!validCredentials(email, password)) {
    return res.status(400).json({ error: "أدخل بريدًا صحيحًا وكلمة مرور من 8 أحرف على الأقل." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const cleanEmail = email.trim();

    db.run(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [cleanEmail, passwordHash],
      function (error) {
        if (error) {
          if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(409).json({ error: "هذا البريد مسجل بالفعل." });
          }
          return next(error);
        }

        const token = jwt.sign({ userId: this.lastID, email: cleanEmail }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({ message: "تم إنشاء الحساب بنجاح.", token });
      }
    );
  } catch (error) {
    next(error);
  }
});

// 2. مسار تسجيل الدخول (Login)
app.post("/api/auth/login", (req, res, next) => {
  const { email, password } = req.body || {};

  if (!validCredentials(email, password)) {
    return res.status(400).json({ error: "بيانات الدخول غير صحيحة." });
  }

  const cleanEmail = email.trim();

  db.get(
    "SELECT id, email, password_hash FROM users WHERE email = ? COLLATE NOCASE",
    [cleanEmail],
    async (error, user) => {
      if (error) return next(error);

      const matches = user ? await bcrypt.compare(password, user.password_hash) : false;

      if (!matches) {
        return res.status(401).json({ error: "البريد أو كلمة المرور غير صحيحة." });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      return res.json({
        message: "مرحبًا بك، تم تسجيل الدخول بنجاح.",
        token,
        user: { id: user.id, email: user.email }
      });
    }
  );
});

// معالجة الأخطاء العامة
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({ error: "حدث خطأ في الخادم." });
});

// تشغيل السيرفر محلياً أو تصديره لـ Vercel
if (!isVercel) {
  app.listen(port, () => console.log(`Portfolio server running at http://localhost:${port}`));
}

module.exports = app;