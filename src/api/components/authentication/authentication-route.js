const express = require('express');

const authenticationControllers = require('./authentication-controller');
const authenticationValidators = require('./authentication-validator');
const celebrate = require('../../../core/celebrate-wrappers');

const route = express.Router();

module.exports = (app) => {
  app.use('/authentication', route);

  route.post(
    '/login',
    authenticationControllers.limiter,
    celebrate(authenticationValidators.login),
    authenticationControllers.login
  );
};
