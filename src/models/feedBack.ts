import { Schema, model, Document, Types } from "mongoose";

interface IFeedback extends Document {
  user_Id: Types.ObjectId;   
  camp_Id: Types.ObjectId;   
  message: string;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  user_Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  camp_Id: { type: Schema.Types.ObjectId, ref: "Camp", required: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;
