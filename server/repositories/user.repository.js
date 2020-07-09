const User = require('../models/user.model');

const usersRepository = {};

usersRepository.findOne = async (options) => {
    return User.findOne(options);
};

usersRepository.find = async (options) => {
    return await User.find(options);
};

usersRepository.saveNewUser  = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports = usersRepository;
