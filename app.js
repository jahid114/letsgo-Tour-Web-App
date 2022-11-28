const express = require('express');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
const ApiError = require('./utility/apiError');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const errorHandler = require('./Controller/errorController');

// Global Middleware

// security headers
app.use(helmet());

// control no of request
const limiter = rateLimiter({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP! Please try again after 1 hour',
});
app.use('/api', limiter);

// Limit the total amount of data
app.use(express.json({ limit: '10kb' }));

// prevent nosql injection and cross site scripting attach
app.use(mongoSanitize());
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
      'ratingsQuantity',
    ],
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find the ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
