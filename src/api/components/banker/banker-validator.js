const joi = require('joi');

module.exports = {
  createBanker: {
    body: {
      account_id: joi.string().min(8).max(8).required().label('account_id'),
      nik: joi.string().min(16).max(16).required().label('NIK'),
      nama: joi.string().min(1).max(100).required().label('Nama'),
      email: joi.string().email().required().label('Email'),
      pin: joi.string().min(6).max(6).required().label('PIN'),
      pin_confirm: joi
        .string()
        .min(6)
        .max(6)
        .required()
        .label('PIN CONFIRMATION'),
      balance: joi.number().min(0).required().label('Balance'),
      card: joi
        .string()
        .valid('Platinum', 'Gold', 'silver')
        .required()
        .label('Card'),
    },
  },

  updateBanker: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      pin_old: joi.number().min(6).max(6).required().label('PIN OLD'),
      pin_new: joi.number().min(6).max(6).required().label('PIN NEW'),

      pin_confirm: joi
        .number()
        .min(6)
        .max(6)
        .required()
        .label('PIN CONFIRMATION'),
    },
  },
};
