const express = require('express');
const router = express.Router();
const ShowTime = require('../models/showTimeModel');
// const auth = require('../middleware/auth');

/**
 * @route   GET /api/showtimes/:id
 * @desc    Get showtime details with seat map
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const showtime = await ShowTime.findById(req.params.id)
            .populate('movieId', 'title poster duration')
            .populate('theatreId', 'name address');

        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        res.json(showtime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @route   POST /api/showtimes/:id/book
 * @desc    Book seats for a showtime
 * @access  Private
 */
router.post('/:id/book', async (req, res) => {
    try {
        const { seats } = req.body;

        if (!seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ message: 'Please select seats to book' });
        }

        const showtime = await ShowTime.findById(req.params.id);

        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        // Check if all seats are available
        const unavailableSeats = [];
        seats.forEach(seatNumber => {
            const seat = showtime.seatMap.seats.find(s => s.seatNumber === seatNumber);
            if (!seat || seat.status !== 'AVAILABLE') {
                unavailableSeats.push(seatNumber);
            }
        });

        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: `The following seats are unavailable: ${unavailableSeats.join(', ')}`,
                unavailableSeats
            });
        }

        // Book the seats
        await showtime.bookSeats(seats);

        // Create a booking record (simplified, you'd likely have a separate Booking model)
        // This is just a placeholder for the complete implementation
        const booking = {
            user: req.user.id,
            showtime: showtime._id,
            seats,
            totalAmount: seats.reduce((total, seatNumber) => {
                const seat = showtime.seatMap.seats.find(s => s.seatNumber === seatNumber);
                return total + (seat ? seat.price : 0);
            }, 0),
            bookingDate: Date.now()
        };

        // Here you would save the booking to your database

        res.json({
            message: 'Seats booked successfully',
            booking
        });
    } catch (err) {
        console.error(err);
        if (err.message.includes('already booked') || err.message.includes('not found')) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;