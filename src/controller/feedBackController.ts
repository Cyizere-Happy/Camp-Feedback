import { Request, Response } from "express";
import Camp from "../models/camp";
import Feedback from "../models/feedBack";

export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { user_Id, camp_Id, message } = req.body;

    if (!user_Id || !camp_Id || !message) {
      return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    // Check if camp exists and is active
    const camp = await Camp.findById(camp_Id);
    if (!camp) {
      return res.status(404).json({ status: 404, message: "Camp not found" });
    }
    if (!camp.isActive) {
      return res.status(403).json({ status: 403, message: "Cannot submit feedback for inactive camp" });
    }

    const newFeedback = new Feedback({ user_Id, camp_Id, message });
    await newFeedback.save();

    return res.status(201).json({ status: 201, message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};


export const listFeedbacks = async (req: Request, res: Response) => {
  try {
    // Optional: populate user and camp for more info
    const feedbacks = await Feedback.find()
      .populate("user_Id", "fullName email")
      .populate("camp_Id", "name location");

    return res.status(200).json({ status: 200, feedbacks });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};

// Get feedbacks for a specific camp
export const getFeedbacksByCamp = async (req: Request, res: Response) => {
  try {
    const campId = req.params.campId;
    const feedbacks = await Feedback.find({ camp_Id: campId })
      .populate("user_Id", "fullName email")
      .populate("camp_Id", "name location");

    return res.status(200).json({ status: 200, feedbacks });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error instanceof Error ? error.message : "Unknown error" });
  }
};
