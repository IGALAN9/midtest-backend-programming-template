const bankersRepository = require('./banker-repository');
const { hashPassword } = require('../../../utils/password');
const { response } = require('express');
const { nik } = require('../../../models/banker-schema');

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
      account_id: bankers.account_id,
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
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getBanker(id) {
  const banker = await bankersRepository.getbanker(id);

  // User not found
  if (!banker) {
    return null;
  }

  return {
    account_id: bankers.account_id,
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
 * Check whether the email is registered
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

module.exports = {
  getBankers,
  getBanker,
  createBanker,
  nikIsRegistered,
};
