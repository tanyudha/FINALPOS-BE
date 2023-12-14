import express from "express";
import {signup, login, check_user, protect_route} from "Services/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-user", protect_route, check_user);

export default router;
