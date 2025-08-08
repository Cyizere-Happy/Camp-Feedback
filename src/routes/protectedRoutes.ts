import express from 'express';
import { checkRole } from '../middlewares/CheckRole';
import { adminRoute, userRoute } from '../controller/userController';
import { authenticate } from '../middlewares/authentication';

const userRouter = express.Router();

userRouter.get('/admin', authenticate, checkRole('admin'), adminRoute);
userRouter.get('/user', authenticate, checkRole('user'), userRoute);

export default userRouter;
