const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const validator = require('validator');

const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Stock name is required"],
        trim: true,
        unique: true,
        minLength: [2, "Stock name must be at least 3 characters"],
        maxLength: [40, "Stock name no more than 40 characters"],
    },
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
    }],
    unit: {
        type: String,
        enum: {
            values: ["kg", "litre", "pic", "bag"],
            message: "Unit can't be {VALUE}. Only kg/liter/pic/bag are accepted" // * {VALUE} - user Input *
        },
        required: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price can't be negative"]
    },
    status: {
        type: String,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be ${VALUE}. Only in-stock/out-of-stock/discontinued are acceptable"
        },

    },
    suppliedBy: {
        name: { type: String, trim: true, required: [true, "Supplier name is required"] },
        id: {
            type: ObjectId,
            ref: 'Supplier',
            required: true
        }
    },
    brand: {
        name: { type: String, trim: true, required: [true, "Brand is required"] },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true
        }
    },
    store: {
        name: { type: String, trim: true, required: [true, "Brand is required"] },
        id: {
            type: ObjectId,
            ref: 'Store',
            required: true
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: String,
        required: [true, "Category is required"],
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
}, { timestamps: true })


const Stock = mongoose.model("Stock", stockSchema)

module.exports = Stock