import { Router } from "express";
import { protect } from "../middlewares/isAuth";
import { create, getAll } from "../controllers/taskController";

const router = Router();

router.use(protect);

router.post("/", create);
router.get("/", getAll);

export default router;