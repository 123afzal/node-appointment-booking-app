const userRepository = require('../repositories/user.repository');
const messages = require('../utils/server.messages');


const authService = {};

authService.register = async (data) => {
    const {email} = data;

    // Make sure this account doesn't already exist
    const isUserExist = await userRepository.findOne({email});

    if (isUserExist) return {response: messages.USER_EMAIL_EXIST};

    const user = await userRepository.saveNewUser(data);
    return {
        response: messages.USER_CREATED,
        user
    };
};

authService.login = async (data) => {
    const { email, password } = data;

    // check user with this email exist or not
    const user = await userRepository.findOne({email});

    if (!user)
        return {
            response: messages.USER_EMAIL_NOT_EXIST,
        };

    //validate password
    if (!user.comparePassword(password))
        return {
            response: messages.AUTHENTICATION_FAILED,
        };

    // Make sure the user has been verified
    if (!user.isVerified) return {
        response: messages.USER_NOT_VERIFIED,
    };

    // Login successful, write token, and send back user
    return {
        response: messages.SUCCESSFUL_LOGIN,
        data: {
            token: user.generateJWT(),
            user: user
        }
    }
};



module.exports = authService;
