const express = require("express");
const { register, login, getMe, updateProfile, logout, forgotPassword } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateProfile);
router.post("/logout", requireAuth, logout);
router.post("/forgot-password", forgotPassword);

module.exports = router;
