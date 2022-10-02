const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const { arrayImageValidate } = require('../Validator/customValidator');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        unique: true,
        minLength: [2, "Product name must be at least 3 characters"],
        maxLength: [20, "Product name no more than 20 characters"],
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        enum: {
            values: ["kg", "litre", "pic", "bag"],
            message: "Unit can't be {VALUE}. Only kg/liter/pic/bag are accepted" // * {VALUE} - user Input *
        },
        required: true
    },
    imageURLs: [{
        type: String,
        validate: {
            validator: arrayImageValidate,
            message: "Image URL is not correct."
        }
    }],
    viewCount: {
        type: Number,
        default: 0
    },
    suppiler: {
        type: ObjectId,
        ref: "Supplier"
    },
    brand: {
        name: { type: String, required: [true, "Brand is required"] },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true
        }
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    /* quantity: {
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
    }, */
}, { timestamps: true })

// Pre Middleware
productSchema.pre("save", function (next) {
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    }
    next()
})

// Post Middleware
productSchema.post("save", function (doc, next) {
    console.log(`Post Middleware: ${doc}`)
    next()
})

// Instance Method
productSchema.methods.logger = function () {
    console.log(`Instance Method: ${this.name}`);
}

const ProductModel = mongoose.model("Product", productSchema)

module.exports = ProductModel