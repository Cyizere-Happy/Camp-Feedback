import { Router } from "express";
import passport from "passport";
import { listUsers, registerUser } from "../controller/userController";
import { login, adminRoute, userRoute, profileContent } from "../controller/authController";
import { authenticate } from "../middlewares/authentication";
import { checkRole } from "../middlewares/CheckRole";

const router = Router();

router.post("/auth/register", registerUser); 
router.post("/auth/login", login); 
router.get("/users", authenticate, checkRole('admin'), listUsers);           

router.get("/profile", authenticate, profileContent);


export default router;
