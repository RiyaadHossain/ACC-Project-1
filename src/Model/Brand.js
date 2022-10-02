const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true, // How to show custom error message .....................?
        required: [true, "Please provide a brand name"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Plase provide a valid web address."]
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })

brandSchema.pre('save', function (next) {
    // capitalize
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
    next();
});

module.exports = Brand = mongoose.model("Brand", brandSchema)