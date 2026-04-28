import express from 'express'
import { protect } from '../middlewares/isAuth';
import { createComment, getComment } from '../controllers/commentController';
const router = express.Router();

router.route('/').post(protect,createComment)
router.route('/:taskId').get(protect,getComment)

export default router;
