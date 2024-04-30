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
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // jika gagal selama 5 kali akan kena cooldown 15 menit
  limit: 5, // Limit per ip 5 kali percobaan
  statusCode: 403,
  message: '403 Forbidden: Too many failed login attempts',
  standardHeaders: true,
  legacyHeaders: false,
});

async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  limiter,
};
