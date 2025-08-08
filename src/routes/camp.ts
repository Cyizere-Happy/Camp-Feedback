import { Router } from "express";
import { addCamp, deleteCamp, updateCamp, listCamps, getCampById } from "../controller/campController";
import { checkRole } from "../middlewares/CheckRole";
import { authenticate } from "../middlewares/authentication";

const campRouter = Router()

campRouter.post("/Camp", authenticate, checkRole('admin'), addCamp ); 
campRouter.get('/Camp', authenticate, checkRole('admin'), listCamps)
campRouter.get('/Camp/:id', authenticate, checkRole('admin'), getCampById)
campRouter.put('/Camp/:id', authenticate, checkRole('admin'), updateCamp)
campRouter.delete('/Camp/:id', authenticate, checkRole('admin'), deleteCamp)

export default campRouter
