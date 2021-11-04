const express = require('express');

const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');
const HashService = require('../services/hash.service');
const JSONWebTokenService = require('../services/jsonwebtoken.service');
const UserRepository = require('../repositories/user.repository');
const AuthRouter = require('../routers/auth.router');

const router = express.Router();

const hashService = new HashService();
const tokenService = new JSONWebTokenService();
const userRepository = new UserRepository();
const authService = new AuthService({
  hashService,
  tokenService,
  userRepository,
});
const authController = new AuthController(authService);

const authRouter = new AuthRouter(router, authController);
authRouter.initializeRoutes();

module.exports = router;
