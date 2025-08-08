import { Router } from "express";
import { addRole, deleteRole, getRoleById, listRoles, updateRole } from "../controller/roleController";
import { checkRole } from "../middlewares/CheckRole";
import { authenticate } from "../middlewares/authentication";


const roleRoute = Router();

roleRoute.post("/CreateRole", authenticate, checkRole('admin'), addRole ); 
roleRoute.get('/listRole', authenticate, checkRole('admin'), listRoles)
roleRoute.get('/getRoleById/:id', authenticate, checkRole('admin'), getRoleById)
roleRoute.get('/updateRole/:id', authenticate, checkRole('admin'), updateRole)
roleRoute.delete('/deleteRole/:id', authenticate, checkRole('admin'), deleteRole)

export default roleRoute;
