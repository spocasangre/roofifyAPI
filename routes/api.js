const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/Auth');

const AuthRouter = require('./api/Auth');
const UserRouter = require('./api/User');
const PostRouter = require('./api/Post');

router.use('/auth', AuthRouter);

//router.use(AuthMiddleware.verifyAuth);

router.use('/post', AuthMiddleware.verifyAuth, PostRouter);

router.use('/user', AuthMiddleware.verifyAuth, UserRouter);

module.exports = router;
