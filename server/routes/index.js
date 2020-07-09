const express = require('express');
const auth = require('./auth.routes');
const user = require('./user.routes');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });

    // user routes
    router.use('/user', authenticate, user);

    // auth routes
    router.use('/auth', auth);

    // global prefix for routes api
    app.use('/api', router);
};
