import { Router } from "express";
import { protect } from "../middlewares/isAuth";
import { validate } from "../middlewares/validate";
import { createProjectSchema } from "../validators/projectValidators";
import { addMember, createProject, getProjects, removeMember } from "../controllers/projectController";
import { authorize } from "../middlewares/authorize";

const router = Router();

router
  .route("/create")
  .post(
    protect,
    authorize("ADMIN", "MANAGER"),
    validate(createProjectSchema),
    createProject,
  );
router.route("/").get(protect, getProjects);
router.route("/:id/add-member").post(protect,authorize("ADMIN","MANAGER"), addMember);
router.route("/:id/remove-member").delete(protect,authorize("ADMIN","MANAGER"), removeMember);

export default router;
