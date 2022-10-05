const {
    createUserService,
    getUsersService,
    getManagersService,
    makeSotreManagerService,
    getUserByIdService,
    signinUser,
    findUserByEmail
} = require("../Service/userService");

const { generateToken } = require("../Utils/generateToken");

exports.signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email | !password) {
        return res.status(401).json({
            status: "fail",
            error: "Please provide email and password",
        });
    }

    try {

        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "User didn't find",
            });
        }

        if (!user.status === 'active') {
            return res.status(401).json({
                status: "fail",
                error: "User account isn't active. Please contact support.",
            });
        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            data: { user, token }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const user = await getUsersService();

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.getManagers = async (req, res) => {
    try {
        const managers = await getManagersService();

        res.status(200).json({
            status: "success",
            data: managers,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {

        const user = await createUserService(req.body);

        res.status(200).json({
            status: "success",
            messgae: "Data inserted successfully!",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};

exports.makeStoreManager = async (req, res) => {
    try {
        const user = req.body;

        const userFound = await getUserByIdService(user._id);

        if (!userFound) {
            return res.status(404).json({
                status: "fail",
                error: "No user found for this id",
            });
        }

        const result = await makeSotreManagerService(user._id);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Failed to make manager.",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Successfully made store manager!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};