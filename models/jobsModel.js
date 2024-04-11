import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        requied: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Job position is required'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview"],
        default: "pending"
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "inernship", "contract"],
        default: "full-time"
    },
    workLocation: {
        type: String,
        default: "Ha Noi"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model('Job', jobSchema)