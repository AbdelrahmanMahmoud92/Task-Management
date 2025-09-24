const mongoose = require("mongoose");
const PRIORITY_VALIDATION = require("../../BusinessLayer/enums/priority-validation");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    priority: {
        type: String,
        enum: Object.values(PRIORITY_VALIDATION),
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false, 
    },
    image_url: {
        type: String,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
