

import express from 'express'
import { protect } from '../middlewares/isAuth';
import { authorize } from '../middlewares/authorize';
import { getAllUsers } from '../controllers/userController';
const router = express.Router();

router.route('/getAllUsers').get(protect,authorize('ADMIN'),getAllUsers)

export default router