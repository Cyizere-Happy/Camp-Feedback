import { Router } from "express";
import { addCamp, deleteCamp, updateCamp, listCamps, getCampById } from "../controller/campController";
import { checkRole } from "../middlewares/CheckRole";
import { authenticate } from "../middlewares/authentication";

const campRouter = Router()

campRouter.post("/CreateCamp", authenticate, checkRole('admin'), addCamp ); 
campRouter.get('/listCamp', authenticate, checkRole('admin'), listCamps)
campRouter.get('/getCampById/:id', authenticate, checkRole('admin'), getCampById)
campRouter.put('/updateCamp/:id', authenticate, checkRole('admin'), updateCamp)
campRouter.delete('/deleteCamp/:id', authenticate, checkRole('admin'), deleteCamp)

export default campRouter
