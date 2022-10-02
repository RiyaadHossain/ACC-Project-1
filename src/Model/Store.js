const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true, // How to show custom error message .....................?
        required: [true, "Please provide a store name"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: 50
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: 'User'
        }
    }
}, { timestamps: true })

storeSchema.pre('save', function (next) {
    // capitalize
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
    next();
});

module.exports = Store = mongoose.model("Store", storeSchema)