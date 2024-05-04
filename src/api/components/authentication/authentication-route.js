const express = require('express');

const authenticationControllers = require('./authentication-controller');
const authenticationValidators = require('./authentication-validator');
const celebrate = require('../../../core/celebrate-wrappers');
const { rateLimit } = require('express-rate-limit');

const route = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // jika gagal selama 5 kali akan kena cooldown 15 menit
  limit: 5, // Limit per ip 5 kali percobaan
  standardHeaders: true,
  legacyHeaders: false,
  handler: (
    request,
    response,
    next,
    options //berikan pesan jika user telah mencoba login selama 5 kali
  ) =>
    response
      .status(403)
      .send(
        '403 Forbidden: user ' +
          request.body.email +
          ' telah mencoba login lebih dari 5 kali'
      ),
});

module.exports = (app) => {
  app.use('/authentication', route);

  route.post(
    '/login',
    limiter,
    celebrate(authenticationValidators.login),
    authenticationControllers.login
  );
};
