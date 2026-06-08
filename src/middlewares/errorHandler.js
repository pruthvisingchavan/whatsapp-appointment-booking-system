const logger = require('../utils/logger');

function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found.` });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred.'
    : err.message;

  logger.error(`[${req.method} ${req.path}] ${err.stack || err.message}`);

  res.status(status).json({ success: false, error: message });
}

module.exports = { notFoundHandler, errorHandler };