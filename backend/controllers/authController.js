const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const safeUser = (row) => ({ id: row.id, name: row.name, email: row.email, createdAt: row.created_at });

function issueToken(user) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  return jwt.sign({ sub: String(user.id) }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

async function register(req, res, next) {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!name) return res.status(400).json({ success: false, error: "Full name is required." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, error: "Please enter a valid email address." });
  if (password.length < 6) return res.status(400).json({ success: false, error: "Password must be at least 6 characters long." });

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, passwordHash]);
    const [rows] = await pool.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", [result.insertId]);
    const user = safeUser(rows[0]);
    res.status(201).json({ success: true, message: "User registered successfully", user, token: issueToken(rows[0]) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ success: false, error: "An account with this email address already exists." });
    next(error);
  }
}

async function login(req, res, next) {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!email || !password) return res.status(400).json({ success: false, error: "Email and password are required." });

  try {
    const [rows] = await pool.execute("SELECT id, name, email, password_hash, created_at FROM users WHERE email = ? LIMIT 1", [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }
    res.json({ success: true, message: "Login successful", token: issueToken(user), user: safeUser(user) });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const [rows] = await pool.execute("SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1", [req.user.id]);
    if (!rows[0]) return res.status(401).json({ success: false, error: "User no longer exists." });
    res.json({ success: true, user: safeUser(rows[0]) });
  } catch (error) { next(error); }
}

async function updateProfile(req, res, next) {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const password = typeof req.body.newPassword === "string" ? req.body.newPassword : "";
  if (password && password.length < 6) return res.status(400).json({ success: false, error: "New password must be at least 6 characters." });
  if (!name && !password) return getMe(req, res, next);

  try {
    const updates = [];
    const values = [];
    if (name) { updates.push("name = ?"); values.push(name); }
    if (password) { updates.push("password_hash = ?"); values.push(await bcrypt.hash(password, 12)); }
    values.push(req.user.id);
    await pool.execute(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, values);
    return getMe(req, res, next);
  } catch (error) { next(error); }
}

function logout(_req, res) {
  res.json({ success: true, message: "Logged out successfully." });
}

function forgotPassword(req, res) {
  if (!req.body.email) return res.status(400).json({ success: false, error: "Email is required." });
  res.json({ success: true, message: "If an account with that email exists, reset instructions will be sent." });
}

module.exports = { register, login, getMe, updateProfile, logout, forgotPassword };
