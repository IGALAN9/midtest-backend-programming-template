const { Banker } = require('../../../models');

/**
 * Get a list of customer
 * @returns {Promise}
 */
async function getBankers() {
  const bankerQuery = Banker.find({}).select('-nik').lean().exec();
  return bankerQuery;
}

/**
 * Get customer detail
 * @param {string} nik - customer nik
 * @returns {Promise}
 */

async function getBankerByAccountId(account_id) {
  return Banker.findOne({ account_id: account_id });
}

/**
 * Create new customer
 * @param {string} account_id - account_id
 * @param {string} nik - nik
 * @param {string} nama - nama
 * @param {string} email - nama
 * @param {string} pin - Hashed pin
 * @param {number} balance - balance
 * @param {string} card - card_type
 * @param {number} monthly_tax - monthly_tax
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
 * Update existing customer
 * @param {string} account_id
 * @param {number} balance
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

/**
 * Delete a customer
 * @param {string} account_id - customer_id
 * @returns {Promise}
 */
async function deleteBanker(account_id) {
  return Banker.deleteOne({ account_id: account_id });
}

module.exports = {
  getBankers,
  createBanker,
  updateBanker,
  deleteBanker,
  getBankerByAccountId,
  nikIsRegistered,
  account_idIsRegistered,
};
