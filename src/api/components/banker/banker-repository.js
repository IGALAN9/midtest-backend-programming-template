const { Banker } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getBankers() {
  return Banker.find({});
}

/**
 * Get user detail
 * @param {string} nik - User NIK
 * @returns {Promise}
 */
async function getBanker(nik) {
  return Banker.find({ nik: nik });
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

//mengecheck apakah nik sudah terdaftar
async function nikIsRegistered(nik) {
  return Banker.findOne({ nik: nik });
}

//mengecheck apakah account id sudah terdaftar
async function account_idIsRegistered(account_id) {
  return Banker.findOne({ account_id: account_id });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateBanker(account_id, balance) {
  return Banker.updateOne(
    {
      account_id: account_id,
    },
    {
      $set: {
        balance,
      },
    }
  );
}

module.exports = {
  getBankers,
  getBanker,
  createBanker,
  updateBanker,
  nikIsRegistered,
  account_idIsRegistered,
};
