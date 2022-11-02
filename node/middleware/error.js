function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status).send(err.message);
}

module.exports = errorHandler;
