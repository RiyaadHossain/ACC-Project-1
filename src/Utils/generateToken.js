const jwt = require('jsonwebtoken');

exports.generateToken = async (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
    return token
}