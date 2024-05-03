const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const { rateLimit } = require('express-rate-limit');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */

/**
 * Handle limits login
 * jika gagal 5 kali bakal kena cooldown 15 menit
 */

async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      return response.json({
        status_code: '403',
        message:
          'user ' +
          request.body.email +
          ' gagal login percobaan login ke- ' +
          request.rateLimit.used,
      });
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
