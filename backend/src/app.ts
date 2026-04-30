import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './utils/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        msg:"Api Running"
    });
});

import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'
import prohectRoutes from './routes/projectRoutes'
import acitivityRoutes from './routes/activityLogRoute'
import userRoutes from './routes/userRoutes'
import commentRoutes from './routes/commentRoutes'
import InviteRoutes from './routes/inviteRoutes'

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/task',taskRoutes)
app.use('/api/v1/projects',prohectRoutes)
app.use('/api/v1/activity',acitivityRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/comments',commentRoutes)
app.use('/api/v1/invites',InviteRoutes)

app.use(notFound)
app.use(errorHandler)

export default app;