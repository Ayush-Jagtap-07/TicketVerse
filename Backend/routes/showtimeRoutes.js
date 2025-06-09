const express = require('express');
const router = express.Router();
const showtimeController = require("../controllers/showtimeController");

// Endpoint to get show details
router.get('/:id', showtimeController.getShowDetails );

// Endpoint to book tickets for movie and send tickets via email to the user
router.post('/book/:id', showtimeController.bookShowTickets );

module.exports = router;