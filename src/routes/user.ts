import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controller/userController";
import { login, getUserProfile, adminRoute, userRoute } from "../controller/authController";

const router = Router();

router.post("/auth/register", registerUser); 
router.post("/auth/login", login);           

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }), 
  getUserProfile                                    
);

export default router;
