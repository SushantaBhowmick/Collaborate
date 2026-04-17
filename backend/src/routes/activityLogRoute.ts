import express from 'express'
import { protect } from '../middlewares/isAuth';
import { getActivityLogs } from '../controllers/activityLogController';

const router = express.Router();

router.route('/activity/:id').get(protect,getActivityLogs);

export default router;