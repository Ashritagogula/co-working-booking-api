const express = require('express');
const { body, param, validationResult } = require('express-validator');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

const validateBookingCreate = [
  body('workspace_id').isMongoId().withMessage('Invalid workspace ID'),
  body('start_time').isISO8601().withMessage('start_time must be a valid ISO8601 Date').custom((value) => {
    if (new Date(value) <= new Date()) {
      throw new Error('start_time must be in the future');
    }
    return true;
  }),
  body('end_time').isISO8601().withMessage('end_time must be a valid ISO8601 Date').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.start_time)) {
      throw new Error('end_time must be after start_time');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateDelete = [
  param('id').isMongoId().withMessage('Invalid booking ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/', validateBookingCreate, bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.delete('/:id', validateDelete, bookingController.deleteBooking);

module.exports = router;
