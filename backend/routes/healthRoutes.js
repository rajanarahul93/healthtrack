import express from "express";
import { submitHealth } from "../controllers/healthController.js";
import { protect } from "../middleware/auth.js";
import { getHistory } from "../controllers/healthController.js";

const router = express.Router();

router.post("/", protect, submitHealth);
router.get("/history", protect, getHistory);

export default router;