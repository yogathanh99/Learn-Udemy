const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const toursRoute = require('./routes/toursRoute');
const usersRoute = require('./routes/usersRoute');
const reviewRoute = require('./routes/reviewRoute');
const globalErrorHandler = require('./controllers/errorsController');
const AppError = require('./utils/appError');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Global Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in an hour!',
}); // -> In 1 hour, just have max 100 request from same IP
app.use('/api', limiter); //apply limiter for route have /api

// Limit json file equal or less than 10kb
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
// Ex: GET /search?name='Thanh'&name='Vo'
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(express.static(`${__dirname}/public`));

// This is one middleware
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/reviews', reviewRoute);

// It calls Global Error Handling Middleware
//Express knows it is errors handling middleware
//if app.use() has 4 parameters
app.use(globalErrorHandler);

module.exports = app;
