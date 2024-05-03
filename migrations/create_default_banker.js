const logger = require('../src/core/logger')('api');
const { Banking } = require('../src/models');
const { hashPassword } = require('../src/utils/password');
const dotenv = require('dotenv');
dotenv.config();

logger.info('Creating default users-Banking');
console.log(process.env.ACCOUNT_ID);
(async () => {
  try {
    const numUsers = await Banking.countDocuments({
      nik: process.env.NIK,
    });

    if (numUsers > 0) {
      throw new Error(`Banker ${account_id} already exists`);
    }

    const hashedPassword = await hashPassword(process.env.PIN);
    await Banking.create({
      account_id: process.env.ACCOUNT_ID,
      nama: process.env.NAMA,
      pin: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
