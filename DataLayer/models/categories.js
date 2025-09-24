const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        match: /^#([0-9A-Fa-f]{6})$/
    },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
