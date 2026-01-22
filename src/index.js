'use strict';

require('dotenv').config();

const { sequelize } = require('./db');

require('./models/User');

// eslint-disable-next-line no-unused-expressions
(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('DB connected OK');

    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('DB synced OK');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('DB error:', e);
    process.exit(1);
  }
})();
