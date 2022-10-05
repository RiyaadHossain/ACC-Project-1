exports.authorization = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(400).json({
                status: "fail",
                error: "Authorization failed",
            });
        }
        next()
    }
}