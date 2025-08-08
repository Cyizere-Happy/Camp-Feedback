import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user"

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: info?.message || 'Login failed' });
    }

    const token = jwt.sign(
      { id: user._id.toString() }, // only user ID
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        email: user.email,
      },
    });
  })(req, res);
};

export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user as typeof User;
  res.json({ name: user.name });
};

export const adminRoute = (req:Request, res: Response) =>{
  res.json({message: "Hello admin!!"})
}

export const userRoute = (req:Request, res: Response) =>{
  res.json({message: "Hello user!!"})
}