import mongoose from "mongoose";
import role from "./role";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: [true, "Please provide your name"]
    },
    email: {
        type: String, required: [true, "Please provide your email"], unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }
})

const User = mongoose.model("User", userSchema);
export default User;


