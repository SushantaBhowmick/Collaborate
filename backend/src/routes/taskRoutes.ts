import { Router } from "express";
import { protect } from "../middlewares/isAuth";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate";
import { createTaskSchema } from "../validators/taskValidator";

const router = Router();

router.use(protect);

router
  .route("/")
  .post(
    protect,
    authorize("ADMIN", "MANAGER"),
    validate(createTaskSchema),
    createTask,
  );
router.route("/").get(protect, getTasks);
router.route("/:id").put(protect, updateTask);
router.route("/:id").delete(protect,authorize("ADMIN"),deleteTask);

export default router;
