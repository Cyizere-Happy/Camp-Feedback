import express from "express";
import { addFeedback, listFeedbacks, getFeedbacksByCamp } from "../controller/feedBackController";
import { authenticate } from "../middlewares/authentication";
import { checkRole } from "../middlewares/CheckRole";

const FeedbackRouter = express.Router();

FeedbackRouter.post("/FeedBack", authenticate ,addFeedback);                
FeedbackRouter.get("/FeedBack", authenticate, checkRole('admin') ,listFeedbacks);               
FeedbackRouter.get("/FeedBack/camp/:campId", authenticate, checkRole('admin') ,getFeedbacksByCamp); 

export default FeedbackRouter;
