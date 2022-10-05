const jwt = require('jsonwebtoken');
const { promisify } = require("util")

exports.verifyToken = async (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) {
        res.status(400).json({
            status: "fail",
            error: "Authentication failed",
        });
    }

    try {

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // Make the jwt.verify function a - promise using promisify method
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Internal server Error",
            error: error.message,
        });
    }

}