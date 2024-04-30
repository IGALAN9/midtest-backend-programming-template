const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');
const paginate = require('express-paginate');
const { limiter } = require('../authentication/authentication-controller');

const route = express.Router();

module.exports = (app) => {
  app.use(paginate.middleware(10, 50));
  app.use('/users', route);

  // Get list of users
  route.get('/', authenticationMiddleware, usersControllers.getUsers);

  //pagination

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    limiter,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get('/:id', authenticationMiddleware, usersControllers.getUser);

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  route.delete('/:id', authenticationMiddleware, usersControllers.deleteUser);

  // Change password
  route.post(
    '/:id/change-password',
    authenticationMiddleware,
    celebrate(usersValidator.changePassword),
    usersControllers.changePassword
  );
};
