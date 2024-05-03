const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const banker = require('./components/banker/banker-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  banker(app);

  return app;
};
