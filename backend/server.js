const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), override: false, quiet: true });

const pool = require("./db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const { improveSummary, improveBulletPoint, improveProjectDescription, generateTemplateLayout } = require("./controllers/aiController");
const { analyzeATS, matchJobDescription } = require("./controllers/atsController");
const {
  initiatePayUPayment,
  handlePayUSuccess,
  handlePayUFailure,
  getPaymentStatus,
} = require("./controllers/payuController");

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Resume Maker API Server is running. Open the app at http://localhost:5173" });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Resume Maker API is running" });
});

app.get("/api/test-db", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ success: true, message: "MySQL connected successfully" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.get("/api/user/profile", requireAuth, require("./controllers/authController").getMe);
app.put("/api/user/profile", requireAuth, require("./controllers/authController").updateProfile);

app.post("/api/ats/analyze", requireAuth, analyzeATS);
app.post("/api/ats/job-description", requireAuth, matchJobDescription);
app.post("/api/ai/improve-summary", requireAuth, improveSummary);
app.post("/api/ai/improve-bullet", requireAuth, improveBulletPoint);
app.post("/api/ai/improve-project", requireAuth, improveProjectDescription);
app.post("/api/ai/generate-template", requireAuth, generateTemplateLayout);

// PayU Payment API Routes (Specification Compliant)
app.post("/api/payment/payu/initiate", requireAuth, initiatePayUPayment);
app.post("/api/payment/payu/success", handlePayUSuccess);
app.post("/api/payment/payu/failure", handlePayUFailure);
app.get("/api/payment/status/:resumeId", requireAuth, getPaymentStatus);

// Aliases for compatibility
app.post("/api/payment/payu-hash", requireAuth, initiatePayUPayment);
app.post("/api/payment/payu-callback", handlePayUSuccess);

app.use((req, res) => res.status(404).json({ success: false, error: "Route not found." }));
app.use((error, _req, res, _next) => {
  console.error("API request failed:", error.code || error.message);
  const status = error.statusCode || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? "Internal server error." : error.message,
  });
});

const port = Number(process.env.PORT || 5000);
const server = app.listen(port, "0.0.0.0", async () => {
  console.log(`Resume Maker API listening on http://localhost:${port}`);
  try {
    const conn = await pool.getConnection();
    console.log(`✅ Database connected successfully: ${process.env.DB_NAME || "resume_builder"} on ${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 3306}`);
    conn.release();
  } catch (err) {
    console.error(`❌ Database connection failed:`, err.message);
  }
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);