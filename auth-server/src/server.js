'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes/routes.js');

const logger = require('./middleware/logger.js');

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(logger);

app.use('/api/v1', authRoutes);

app.use('*', notFound);

app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};