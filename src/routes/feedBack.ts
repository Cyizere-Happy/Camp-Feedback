import express from "express";
import { addFeedback, listFeedbacks, getFeedbacksByCamp } from "../controller/feedBackController";
import { authenticate } from "../middlewares/authentication";
import { checkRole } from "../middlewares/CheckRole";

const FeedbackRouter = express.Router();

FeedbackRouter.post("/addFeedBack", authenticate ,addFeedback);                
FeedbackRouter.get("/ListFeedBack", authenticate, checkRole('admin') ,listFeedbacks);               
FeedbackRouter.get("/List/camp/:campId", authenticate, checkRole('admin') ,getFeedbacksByCamp); 

export default FeedbackRouter;
