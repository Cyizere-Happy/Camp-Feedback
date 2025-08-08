import { Request, Response } from "express";
import Camp from "../models/camp";

// Create Camp
export const addCamp = async (req: Request, res: Response) => {
  try {
    const { name, location, date, isActive } = req.body;

    if (!name || !location || !date) {
      return res.status(400).json({ status: 400, message: "Name, location and date are required" });
    }

    const newCamp = new Camp({
      name,
      location,
      date,
      isActive: isActive !== undefined ? isActive : true, // default to true
    });

    await newCamp.save();

    return res.status(201).json({ status: 201, message: "Camp created successfully", camp: newCamp });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};

// List all Camps
export const listCamps = async (req: Request, res: Response) => {
  try {
    const camps = await Camp.find();
    return res.status(200).json({ status: 200, camps });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};

// Get Camp by ID
export const getCampById = async (req: Request, res: Response) => {
  try {
    const camp = await Camp.findById(req.params.id);
    if (!camp) {
      return res.status(404).json({ status: 404, message: "Camp not found" });
    }
    return res.status(200).json({ status: 200, camp });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};

// Update Camp
export const updateCamp = async (req: Request, res: Response) => {
  try {
    const { name, location, date, isActive } = req.body;
    const updatedCamp = await Camp.findByIdAndUpdate(
      req.params.id,
      { name, location, date, isActive },
      { new: true, runValidators: true }
    );
    if (!updatedCamp) {
      return res.status(404).json({ status: 404, message: "Camp not found" });
    }
    return res.status(200).json({ status: 200, message: "Camp updated successfully", camp: updatedCamp });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};

// Delete Camp
export const deleteCamp = async (req: Request, res: Response) => {
  try {
    const deletedCamp = await Camp.findByIdAndDelete(req.params.id);
    if (!deletedCamp) {
      return res.status(404).json({ status: 404, message: "Camp not found" });
    }
    return res.status(200).json({ status: 200, message: "Camp deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};
