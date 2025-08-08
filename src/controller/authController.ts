import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user"
import dotenv from "dotenv"
dotenv.config()

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

export const profileContent = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret) as { id: string };
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!decoded?.id) return res.status(401).json({ message: 'Invalid token payload' });

  const user = await User.findById(decoded.id).populate('role_Id');
  if (!user) return res.status(404).json({ message: 'User not found' });

  const userRoleName = (user.role_Id as any)?.name;
  if (!userRoleName) {
    return res.status(403).json({ message: 'User role not found' });
  }

  res.status(200).json({ status: 200, ProfileInfo: {name: user.fullName, email: user.email }});
};


export const adminRoute = (req:Request, res: Response) =>{
  res.json({message: "Hello admin!!"})
}

export const userRoute = (req:Request, res: Response) =>{
  res.json({message: "Hello user!!"})
}