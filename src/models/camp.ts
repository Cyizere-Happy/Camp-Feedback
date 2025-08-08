import { Schema, model, Document } from "mongoose";

interface ICamp extends Document {
  name: string;
  location: string;
  date: Date;
  isActive: Boolean
}

const CampSchema = new Schema<ICamp>({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});

const Camp = model<ICamp>("Camp", CampSchema);

export default Camp;
