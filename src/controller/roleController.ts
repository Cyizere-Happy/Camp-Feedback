import { Request, Response } from "express";
import Role from "../models/role";

// Create Role
export const addRole = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ status: 400, message: "Role name is required" });
        }

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ status: 400, message: "Role already exists" });
        }

        const newRole = new Role({ name, description });
        await newRole.save();

        return res.status(201).json({ status: 201, message: "Role created successfully", role: newRole });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

// Get All Roles
export const listRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find();
        return res.status(200).json({ status: 200, roles });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Get Role by ID
export const getRoleById = async (req: Request, res: Response) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ status: 404, message: "Role not found" });
        }
        return res.status(200).json({ status: 200, role });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Update Role
export const updateRole = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ status: 404, message: "Role not found" });
        }
        return res.status(200).json({ status: 200, message: "Role updated successfully", role: updatedRole });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Delete Role
export const deleteRole = async (req: Request, res: Response) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ status: 404, message: "Role not found" });
        }
        return res.status(200).json({ status: 200, message: "Role deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
    }
};
