const { Banker } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getBankers() {
  return Banking.find({});
}

/**
 * Get user detail
 * @param {string} nik - User NIK
 * @returns {Promise}
 */
async function getBanker(nik) {
  return Banking.find({ nik: nik });
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createBanker(
  account_id,
  nik,
  nama,
  email,
  pin,
  balance,
  card,
  monthly_tax
) {
  return Banker.create({
    account_id,
    nik,
    nama,
    email,
    pin,
    balance,
    card,
    monthly_tax,
  });
}

async function nikIsRegistered(nik) {
  return Banker.findOne({ nik: nik });
}

module.exports = {
  getBankers,
  getBanker,
  createBanker,
  nikIsRegistered,
};
