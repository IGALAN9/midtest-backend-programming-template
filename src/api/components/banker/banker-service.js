const bankersRepository = require('./banker-repository');
const { hashPassword } = require('../../../utils/password');
const { response } = require('express');
const { nik, account_id } = require('../../../models/banker-schema');

/**
 * Get list of bankers
 * @returns {Array}
 */
async function getBankers(request, response) {
  const bankers = await bankersRepository.getBankers(request, response);

  const results = [];
  for (let i = 0; i < bankers.length; i += 1) {
    const banker = bankers[i];
    results.push({
      account_id: banker.account_id,
      nik: banker.nik,
      nama: banker.nama,
      email: banker.email,
      balance: banker.balance,
      card: banker.card,
      monthly_tax: banker.monthly_tax,
    });
  }

  return results;
}

/**
 * Get banker detail
 * @param {string} id - Banker ID
 * @returns {Object}
 */
async function getBanker(account_id) {
  const banker = await bankersRepository.getBankerByAccountId(account_id);
  console.log(banker);
  // Banker not found
  if (!banker) {
    return null;
  }

  return {
    account_id: banker.account_id,
    nik: banker.nik,
    nama: banker.nama,
    email: banker.email,
    balance: banker.balance,
    card: banker.card,
    monthly_tax: banker.monthly_tax,
  };
}

/**
 * Create new banker
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
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
  // Hash password
  const hashedPin = await hashPassword(pin);

  try {
    await bankersRepository.createBanker(
      account_id,
      nik,
      nama,
      email,
      hashedPin,
      balance,
      card,
      monthly_tax
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the nik is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function nikIsRegistered(nik) {
  const banker = await bankersRepository.nikIsRegistered(nik);

  if (banker) {
    return true;
  }

  return false;
}

/**
 * Check whether the account_id is already in use
 * @param {string} account_Id - account_id
 * @returns {boolean}
 */
async function account_idIsRegistered(account_id) {
  const banker = await bankersRepository.account_idIsRegistered(account_id);

  if (banker) {
    return true;
  }

  return false;
}

/**
 * Update untuk saldo jika banker menambahkan uang ke bank
 * @param {string} account_id - account_id buat cari customer
 * @param {number} balance - balance(saldo)
 * @returns {boolean}
 */
async function updateBanker(account_id, balance) {
  const banker = await bankersRepository.getBankerByAccountId(account_id);

  // customer not found
  if (!banker) {
    return null;
  }

  try {
    await bankersRepository.updateBanker(account_id, balance);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete banker
 * @param {string} id - Banker ID
 * @returns {boolean}
 */
async function deleteBanker(account_id) {
  const banker = await bankersRepository.getBankerByAccountId(account_id);
  // console.log(banker);
  if (!banker) {
    return null;
  }

  try {
    await bankersRepository.deleteBanker(account_id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getBankers,
  getBanker,
  createBanker,
  updateBanker,
  deleteBanker,
  nikIsRegistered,
  account_idIsRegistered,
};
