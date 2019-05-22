const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const probe = require('kube-probe');
const config = require('../lib/config');
const logger = require('../lib/logger');

const log = logger(config.logger);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let isOnline = true;

/*
 * Routes
 */
app.use('/pets', require('./routes/pets'));

const options = {
  readinessURL: '/health',
  livenessURL: '/health',
  livenessCallback: (request, response) => {
    return isOnline ? response.send('OK') : response.sendStatus(500);
  }
};
probe(app, options);

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

module.exports = app;
