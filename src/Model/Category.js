const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Category name is required"],
        unique: true
    },
    description: String,
    imgURL: String
}, { timestamps: true })

categorySchema.pre('save', function (next) {
    // capitalize
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase;
    next();
});

const Category = mongoose.model("Category", categorySchema)
module.exports = Category