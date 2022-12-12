const express = require('express');

const router = express.Router();
const tourController = require('../Controller/tourController');
const authController = require('../Controller/authController');
const reviewRouter = require('./reviewRoutes');

router.route('/:tourId/review', reviewRouter);
router.route('/monthly-plan/:year').get(tourController.monthlyPlan);
router
  .route('/top-5-cheap-tour')
  .get(tourController.aliasCheapTour, tourController.getAllTours);
router.route('/tour-stats').get(tourController.tourStatistics);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(authController.protect, tourController.addNewTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
