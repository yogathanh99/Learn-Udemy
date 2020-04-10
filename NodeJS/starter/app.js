const express = require('express');
const morgan = require('morgan');

const toursRoute = require('./routes/toursRoute');
const usersRoute = require('./routes/usersRoute');
const globalErrorHandler = require('./controllers/errorsControler');
const AppError = require('./utils/appError');

const app = express();
//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, _, next) => {
  console.log('Hello middleware');
  next();
});
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', usersRoute);
//Handle All request which has not route
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  // next(err)

  //When passing something into next()
  // next() will assume it is error and stop all middleware
  // and go to Global Error Handling Middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// It calls Global Error Handling Middleware
//Express knows it is errors handling middleware
//if app.use() has 4 parameters
app.use(globalErrorHandler);

module.exports = app;
