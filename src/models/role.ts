import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String, 
        min:10,
        required: true
    },
    description: {type: String}
})

const role = mongoose.model('role', roleSchema)

export default role