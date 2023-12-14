import express from "express";
import { daily_summary, user_summary } from "Services/analytics";
const router = express.Router();

router.get("/daily/:date", daily_summary);
router.get("/by-user", user_summary);

export default router;
