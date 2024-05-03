const bankersService = require('./banker-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of customer request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBankers(request, response, next) {
  try {
    const banker = await bankersService.getBankers(request, response);

    return response.status(200).json(banker);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get customer detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBanker(request, response, next) {
  try {
    const banker = await bankersService.getBanker(request.params.account_id);

    if (!banker) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown customer');
    }

    return response.status(200).json(banker);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create bank_customer request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createBanker(request, response, next) {
  try {
    const account_id = request.body.account_id;
    const nik = request.body.nik;
    const nama = request.body.nama;
    const email = request.body.email;
    const pin = request.body.pin;
    const pin_confirm = request.body.pin_confirm;
    const balance = request.body.balance;
    const card = request.body.card;
    let monthly_tax = 2000;
    if (card == 'gold') {
      monthly_tax = 5000;
    }
    if (card == 'platinum') {
      monthly_tax = 10000;
    }

    // account_id must be unique
    const nikIsRegistered = await bankersService.nikIsRegistered(nik);
    if (nikIsRegistered) {
      throw new Error(`Banker ${nik} already exists`);
    }

    const success = await bankersService.createBanker(
      account_id,
      nik,
      nama,
      email,
      pin,
      balance,
      card,
      monthly_tax
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create banker'
      );
    }

    return response.status(200).json({ account_id, nama });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBankers,
  getBanker,
  createBanker,
};
