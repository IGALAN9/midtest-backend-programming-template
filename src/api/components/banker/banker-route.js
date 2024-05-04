const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const bankersControllers = require('./banker-controller');
const bankersValidator = require('./banker-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/bankers', route);

  // Get list of bankers
  route.get('/', authenticationMiddleware, bankersControllers.getBankers);

  // Create banker
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(bankersValidator.createBanker),
    bankersControllers.createBanker
  );

  // Get banker detail
  route.get('/:nik', authenticationMiddleware, bankersControllers.createBanker);

  // Update user
  route.put(
    '/:account_id',
    authenticationMiddleware,
    celebrate(bankersValidator.updateBanker),
    bankersControllers.updateBanker
  );
};
