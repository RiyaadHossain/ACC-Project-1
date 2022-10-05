const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: "Password is not strong enough.",
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm password is required"],
        validate: {
            validator: function (value) {
                return this.password === this.confirmPassword
            },
            message: "Password didn't match"
        }
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    contactNumber: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => { return validator.isMobilePhone(value) },
            message: "Please provide a valid phone number",
        },
    },
    ],
    shippingAddress: String,
    division: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "rajshahi", "chattogram", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
            message: "{VALUE} is not  acorrect division!",
        },
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
});

// Hash Password______________
userSchema.pre('save', function (next) {
    const hashedPass = bcrypt.hashSync(this.password, 10)
    this.password = hashedPass
    this.confirmPassword = undefined
    next()
})

// Compare hash Password_____________
userSchema.methods.compareHash = (pass, hashedPass) => {
    const isValidPassword = bcrypt.compareSync(pass, hashedPass)
    return isValidPassword
}

const User = mongoose.model("User", userSchema);

module.exports = User;


/*

"name":"Mezbaul Abedin Forhan",
"email":"mezba@test.com",
"password":"mezba123456##",
"confirmPassword":"mezba123456##",
"firtsName":"Mezbaul Abedin",
"lastName":"Forhan",
"contactNumber":"11111111111",
"shippingAddress:"944 osthir Street",
"presentAddress":"944 osthir Street",
"permanentAddress":"944 Russell Street",
"division":"chattogram",
"imageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",
"status":"active",


//for manager_________________

"name":"Manager",
"email":"managerctg@test.com",
"password":"mezba123456##",
"confirmPassword":"mezba123456##",
"firtsName":"Manager of",
"lastName":"CTG",
"contactNumber":"11111111111",
"shippingAddress:"944 osthir Street",
"division":"chattogram",
"imageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",
"status":"active",
"emergencyContactNumber":"01712345678",
"presentAddress":"944 osthir Street",
"permanentAddress":"944 Russell Street",
"nationalIdImageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",

*/