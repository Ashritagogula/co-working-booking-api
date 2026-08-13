const Booking = require('../models/Booking');

exports.createBooking = async (req, res, next) => {
  try {
    const { workspace_id, start_time, end_time } = req.body;

    const overlappingBooking = await Booking.findOne({
      workspace_id: workspace_id,
      $or: [
        {
          start_time: { $lt: end_time },
          end_time: { $gt: start_time }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({ message: 'Booking time overlaps with an existing booking' });
    }

    const booking = new Booking({
      workspace_id,
      start_time,
      end_time
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('workspace_id');
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
