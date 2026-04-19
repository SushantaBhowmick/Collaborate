import { Router } from "express";
import { getMyProfile, loginUser, registerUser } from "../controllers/authController";
import { protect } from "../middlewares/isAuth";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/authValidators";

const router = Router();

router.route("/register").post(validate(registerSchema),registerUser)
router.route("/login").post(validate(loginSchema),loginUser)
router.route("/me").get(protect,getMyProfile)

export default router;