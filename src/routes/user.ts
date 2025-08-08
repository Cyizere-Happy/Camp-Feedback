import { Router } from "express";
import passport from "passport";
import { listUsers, registerUser } from "../controller/userController";
import { login, getUserProfile, adminRoute, userRoute } from "../controller/authController";
import { authenticate } from "../middlewares/authentication";
import { checkRole } from "../middlewares/CheckRole";

const router = Router();

router.post("/auth/register", registerUser); 
router.post("/auth/login", login); 
router.get("/listUsers", authenticate, checkRole('admin'), listUsers);           

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }), 
  getUserProfile                                    
);

export default router;
