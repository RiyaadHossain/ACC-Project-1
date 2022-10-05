const User = require('../Model/User')

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    const {password, ...others} = user.toObject()
    return others
}

exports.getUsersService = async () => {
    const users = await User.find({})
    return users;
}

exports.getManagersService = async () => {
    // const managers = 
    // return users;
}

exports.createUserService = async (data) => {
    const newUser = await User.create(data);
    return newUser;
}

exports.getUserByIdService = async (userId) => {
    const user = await User.findOne({ _id: userId });
    return user;
}

exports.makeSotreManagerService = async (userId) => {
    const result = await User.findByIdAndUpdate(userId, { role: "store-manager" });
    return result;
};
