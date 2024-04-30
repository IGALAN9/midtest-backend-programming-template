const { User } = require('../../../models');
const paginate = require('express-paginate');
const mongoose = require('mongoose');

/**
 * Get a list of users
 * @returns {Promise}
 * @params
 */
async function getUsers(request, response) {
  const sort_by = request.query.sort || 'desc';
  const searchParam = request.query.search || '';
  let field = '';
  let value = '';

  if (searchParam.includes(':')) {
    const [key, val] = searchParam.split(':');
    field = key.trim().toLowerCase();
    value = val.trim();
  }

  const userQuery = User.find({})
    .select('-password')
    .limit(request.query.limit)
    .skip(request.skip);

  if (field.length > 0 && value.length > 0) {
    userQuery.where({ [field]: { $regex: new RegExp('.*' + value + '.*') } });
  }

  if (sort_by && ['asc', 'desc'].includes(sort_by.toLowerCase())) {
    userQuery.sort({ [field || 'email']: sort_by.toLowerCase() });
  }

  const results = await userQuery.lean().exec();
  const itemCount = results.length;
  const pageCount = Math.ceil(itemCount / request.query.limit);

  return response.status(200).json({
    next_page: paginate.hasNextPages(request)(pageCount),
    has_previous_page: request.query.page > 1,
    page_number: request.query.page || 1,
    page_size: request.query.limit || 10,
    total_data: itemCount,
    data: results,
  });
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
