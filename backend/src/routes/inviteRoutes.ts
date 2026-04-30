import express from 'express';
import { acceptInvite, createInvite, getInvites } from '../controllers/inviteController';
import { authorize } from '../middlewares/authorize';
import { protect } from '../middlewares/isAuth';



const router = express.Router();

router.route('/').post(protect, authorize("ADMIN"), createInvite)
router.route('/accept/:token').post(acceptInvite)
router.route('/').get(protect,authorize("ADMIN"),getInvites)

export default router;