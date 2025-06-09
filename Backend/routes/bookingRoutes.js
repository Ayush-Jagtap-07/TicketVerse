const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyJWT, authorizeRoles } = require('../middleware/auth');

// Endpoint to get all bookings
router.get('/all', bookingController.getAllBookings);

// Endpoint to delete a booking
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;