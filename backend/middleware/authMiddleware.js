const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const match = /^Bearer\s+(.+)$/i.exec(req.get("authorization") || "");
  if (!match) return res.status(401).json({ success: false, error: "Authentication required. Please log in." });
  if (!process.env.JWT_SECRET) return res.status(500).json({ success: false, error: "Authentication is not configured." });

  try {
    const payload = jwt.verify(match[1], process.env.JWT_SECRET);
    if (!payload.sub) throw new Error("Invalid token subject");
    req.user = { id: Number(payload.sub) };
    next();
  } catch {
    res.status(401).json({ success: false, error: "Session expired or invalid token. Please log in again." });
  }
}

module.exports = { requireAuth };
