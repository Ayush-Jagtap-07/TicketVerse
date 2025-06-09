const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Event = require('../models/eventModel');
const Theatre = require('../models/theatreModel');

module.exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'username email')
            .populate('movieId', 'title')
            .populate('eventId', 'name')
            .populate('theatreId', 'name');

        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Server error while fetching bookings' });
    }
}

module.exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error('Error deleting booking:', err);
        res.status(500).json({ message: 'Server error while deleting booking' });
    }
}