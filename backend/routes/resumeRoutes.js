const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/resumeController");
const { getBullets, mutateBullet } = require("../controllers/resumeSectionController");

const router = express.Router();
router.use(requireAuth);

router.get("/", controller.listResumes);
router.post("/", controller.createResume);
router.get("/:id", controller.getResume);
router.get("/:id/download", controller.downloadAuthorizedResume);
router.put("/:id", controller.updateResume);
router.delete("/:id", controller.deleteResume);
router.post("/:id/duplicate", controller.duplicateResume);

router.get("/:id/:section/:itemId/bullets", getBullets);
router.post("/:id/:section/:itemId/bullets", mutateBullet);
router.put("/:id/:section/:itemId/bullets/:bulletIndex", mutateBullet);
router.delete("/:id/:section/:itemId/bullets/:bulletIndex", mutateBullet);

router.get("/:id/:section", controller.getSection);
router.put("/:id/:section", controller.mutateSection);
router.post("/:id/:section", controller.mutateSection);
router.put("/:id/:section/:itemId", controller.mutateSection);
router.delete("/:id/:section/:itemId", controller.mutateSection);

module.exports = router;
