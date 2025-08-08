import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Role from '../models/role'; 


export const registerUser = async (req: Request, res: Response) => {
  try {
    // Check if email already exists
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Email already exists",
      });
    }

    // Destructure registration data, expecting role_Id as ObjectId string
    const { fullName, email, password, role_Id } = req.body;

    // Validate role_Id is provided
    if (!role_Id) {
      return res.status(400).json({ message: "role_Id is required" });
    }

    // Validate role_Id exists in Roles collection
    const roleExists = await Role.findById(role_Id);
    if (!roleExists) {
      return res.status(400).json({ message: "Invalid role_Id" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role_Id as ObjectId reference
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role_Id,
    });

    return res.status(201).json({
      status: 201,
      data: null,
      message: "User created successfully",
    });
  } catch (error) {
    const err = error instanceof Error;

    return res.status(500).json({
      status: 500,
      data: null,
      message: err ? error.message : "Unexpected error occurred",
    });
  }
};

export const adminRoute = (req: Request, res: Response) => {
  res.json({ message: 'Hello admin!!', user: req.user });
};

export const userRoute = (req: Request, res: Response) => {
  res.json({ message: 'Hello user!!', user: req.user });
};