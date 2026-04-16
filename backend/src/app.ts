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

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/task',taskRoutes)
app.use('projects',prohectRoutes)

app.use(notFound)
app.use(errorHandler)

export default app;