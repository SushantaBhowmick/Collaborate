import { Router } from "express";
import { getMyProfile, loginUser, registerUser } from "../controllers/authController";
import { protect } from "../middlewares/isAuth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMyProfile);

export default router;