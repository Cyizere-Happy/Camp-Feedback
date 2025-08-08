import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';  
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('❌ JWT_SECRET missing in env');

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

      if (!decoded?.id) return res.status(401).json({ message: 'Invalid token payload' });

      // Find user and populate role document
      const user = await User.findById(decoded.id).populate('role_Id');
      if (!user) return res.status(404).json({ message: 'User not found' });

      // role_Id is populated; access role name
      const userRoleName = (user.role_Id as any)?.name;

      if (!userRoleName) {
        return res.status(403).json({ message: 'User role not found' });
      }

      if (userRoleName !== requiredRole) {
        return res.status(403).json({ message: 'Access denied: Insufficient role' });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
