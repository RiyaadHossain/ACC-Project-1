const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        unique: true,
        minLength: [3, "Product name must be at least 3 characters"],
        maxLength: [20, "Product name no more than 20 characters"],
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        enum: {
            values: ["kg", "litre", "pic", "bag"],
            message: "Unit can't be {VALUE}. Only kg/liter/pic/bag are accepted" // * {VALUE} - user Input *
        },
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: { // -------------------------------------------------------------- * Custom Validator *
            validator: (value) => {
                const isIntegar = Number.isInteger(value)
                isIntegar ? true : false
            },
            message: "Quantity must be a Number"
        }
    },
    status: {
        type: String,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be ${VALUE}. Only in-stock/out-of-stock/discontinued are only available"
        },

    },
    suppiler: {
        type: ObjectId,
        ref: "Supplier"
    },
    category: [{
        name: {
            type: String,
            required: [true, "Category is required"]
        },
        _id: ObjectId
    }],
}, { timestamps: true })

const ProductModel = mongoose.model("Product", productSchema)

module.exports = ProductModel