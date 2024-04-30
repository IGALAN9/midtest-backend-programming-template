const { User } = require('../../../models');
const paginate = require('express-paginate');
const mongoose = require('mongoose');

/**
 * Get a list of users
 * @returns {Promise}
 * @params
 */

async function getUsers(request, response) {
  const sort_by = request.query.sort || 'desc'; //sort by untuk
  const searchParam = request.query.search || ''; //
  let field = ''; //deklarasi field
  let value = ''; //deklarasi value

  //cari user berdasarkan data field yang dicari
  if (searchParam.includes(':')) {
    const [key, val] = searchParam.split(':');
    field = key.trim().toLowerCase();
    value = val.trim();
  }

  //Membuat user query tetapi tidak langsung excecute.
  const userQuery = User.find({})
    .select('-password') //untuk menghilangkan password
    .limit(request.query.limit)
    .skip(request.skip);

  //untuk memastikan nilai field dan value tidak kosong
  if (field && value) {
    //menambahkan user query untuk melakukan pencarian field dengan suatu value tertentu
    userQuery.where({
      [field]: { $regex: new RegExp('.*' + value + '.*'), $options: 'i' },
    });
  }

  //untuk melakukan sorting dengan default value decending
  if (sort_by && ['asc', 'desc'].includes(sort_by.toLowerCase())) {
    userQuery.sort({ [field || 'email']: sort_by.toLowerCase() });
  }

  //mengeksekusi user query dan menyimpan hasilnya dalam variable result
  const results = await userQuery.lean().exec();
  const itemCount = results.length;
  const pageCount = Math.ceil(itemCount / request.query.limit);

  return response.status(200).json({
    next_page: paginate.hasNextPages(request)(pageCount), //untuk mengecheck ada next page atau tidak (boolean)
    has_previous_page: request.query.page > 1, //untuk mengecheck ada previous page atau tidak (boolean)
    page_number: request.query.page || 1, //untuk mengecheck sedang di halaman berapa (Integer)
    page_size: request.query.limit || 10, //untuk mengecheck jumlah data per page (Integer)
    count: itemCount, //untuk menghitung banyak data yang ada
    data: results, //isi data yang di tampilkan
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
