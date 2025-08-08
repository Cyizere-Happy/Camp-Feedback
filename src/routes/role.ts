import { Router } from "express";
import { addRole, deleteRole, getRoleById, listRoles, updateRole } from "../controller/roleController";
import { checkRole } from "../middlewares/CheckRole";
import { authenticate } from "../middlewares/authentication";


const roleRoute = Router();

roleRoute.post("/Role", authenticate, checkRole('admin'), addRole ); 
roleRoute.get('/Role', authenticate, checkRole('admin'), listRoles)
roleRoute.get('/Role/:id', authenticate, checkRole('admin'), getRoleById)
roleRoute.put('/Role/:id', authenticate, checkRole('admin'), updateRole)
roleRoute.delete('/Role/:id', authenticate, checkRole('admin'), deleteRole)

export default roleRoute;
