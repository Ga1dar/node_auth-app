'use strict';

require('dotenv').config();

const express = require('express');
const { sequelize } = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./models/User.js');
require('./models/RefreshSession.js');

const { authRouter } = require('./routes/auth.routes.js');
const { profileRouter } = require('./routes/profile.routes.js');

const app = express();

// eslint-disable-next-line no-undef
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ ok: true }));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = Number(process.env.PORT || 3001);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('DB connected and synced OK');

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Startup error:', e);
    process.exit(1);
  }
})();
