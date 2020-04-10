module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //Error 500 is Internal Server Error
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
