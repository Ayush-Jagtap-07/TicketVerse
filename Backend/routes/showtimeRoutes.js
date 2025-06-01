const express = require('express');
const router = express.Router();
const ShowTime = require('../models/showTimeModel');
const User = require("../models/userModel");
const Theatre = require("../models/theatreModel");
const { convertTo12HourFormat, sendTicketEmail, generateTicketPDF } = require("../utils/helper");
const path = require('path');
const fs = require('fs');

// const auth = require('../middleware/auth');

// /**
//  * @route   GET /api/showtimes/:id
//  * @desc    Get showtime details with seat map
//  * @access  Public
//  */
// router.get('/:id', async (req, res) => {
//     try {
//         const showtime = await ShowTime.findById(req.params.id)
//             .populate('movieId', 'title poster duration')
//             .populate('theatreId', 'name address');

//         if (!showtime) {
//             return res.status(404).json({ message: 'Showtime not found' });
//         }

//         res.json(showtime);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// /**
//  * @route   POST /api/showtimes/:id/book
//  * @desc    Book seats for a showtime
//  * @access  Private
//  */
// router.post('/:id/book', async (req, res) => {
//     try {
//         const { seats } = req.body;

//         if (!seats || !Array.isArray(seats) || seats.length === 0) {
//             return res.status(400).json({ message: 'Please select seats to book' });
//         }

//         const showtime = await ShowTime.findById(req.params.id);

//         if (!showtime) {
//             return res.status(404).json({ message: 'Showtime not found' });
//         }

//         // Check if all seats are available
//         const unavailableSeats = [];
//         seats.forEach(seatNumber => {
//             const seat = showtime.seatMap.seats.find(s => s.seatNumber === seatNumber);
//             if (!seat || seat.status !== 'AVAILABLE') {
//                 unavailableSeats.push(seatNumber);
//             }
//         });

//         if (unavailableSeats.length > 0) {
//             return res.status(400).json({
//                 message: `The following seats are unavailable: ${unavailableSeats.join(', ')}`,
//                 unavailableSeats
//             });
//         }

//         // Book the seats
//         await showtime.bookSeats(seats);

//         // Create a booking record (simplified, you'd likely have a separate Booking model)
//         // This is just a placeholder for the complete implementation
//         const booking = {
//             user: req.user.id,
//             showtime: showtime._id,
//             seats,
//             totalAmount: seats.reduce((total, seatNumber) => {
//                 const seat = showtime.seatMap.seats.find(s => s.seatNumber === seatNumber);
//                 return total + (seat ? seat.price : 0);
//             }, 0),
//             bookingDate: Date.now()
//         };

//         // Here you would save the booking to your database

//         res.json({
//             message: 'Seats booked successfully',
//             booking
//         });
//     } catch (err) {
//         console.error(err);
//         if (err.message.includes('already booked') || err.message.includes('not found')) {
//             return res.status(400).json({ message: err.message });
//         }
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;


router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const show1 = await ShowTime.findById(req.params.id);
        // console.log(show1.seatMap);
        const show = await ShowTime.findById(req.params.id)
            .populate('movieId', 'title')
            .populate('theatreId');
            // .select('-seatMap'); // Excludes seatMap from the response

        if (!show) return res.status(404).json({ message: 'Show not found' });
        // console.log(show);
        res.json(show);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post('/book/:id', async (req, res) => {
//     try {
//         const { seats } = req.body;
//         // console.log(seats);
//         if (!seats || !Array.isArray(seats) || seats.length === 0) {
//           return res.status(400).json({ message: 'Please select seats to book' });
//         }
//         // console.log(req.params.id);
//         const showtime = await ShowTime.findById(req.params.id);
        
//         if (!showtime) {
//           return res.status(404).json({ message: 'Showtime not found' });
//         }
//         // console.log(showtime);
//         // Check if all seats are available
//         const unavailableSeats = [];
//         seats.forEach(s1 => {
//             // console.log("Searching for seat:", s1.seatNumber);
//           const seat = showtime.seatMap.seats.find(s => s.seatNumber === s1.seatNumber);
//           // console.log('Seats :',seat);
//           if (!seat || seat.status !== 'AVAILABLE') {
//             unavailableSeats.push(seatNumber);
//           }
//         });

//         // console.log('Unavailable seats :', unavailableSeats);
        
//         if (unavailableSeats.length > 0) {
//           return res.status(400).json({
//             message: `The following seats are unavailable: ${unavailableSeats.join(', ')}`,
//             unavailableSeats
//           });
//         }
        
//         // Book the seats
//         await showtime.bookSeats(seats);
        
//         // Create a booking record (simplified, you'd likely have a separate Booking model)
//         // This is just a placeholder for the complete implementation
//         const booking = {
//         //   user: req.user.id,
//           showtime: showtime._id,
//           seats,
//           totalAmount: seats.reduce((total, seatNumber) => {
//             const seat = showtime.seatMap.seats.find(s => s.seatNumber === seatNumber);
//             return total + (seat ? seat.price : 0);
//           }, 0),
//           bookingDate: Date.now()
//         };
        
//         // Here you would save the booking to your database
        
//         res.json({ 
//           message: 'Seats booked successfully',
//           booking
//         });
//       } catch (err) {
//         console.error(err);
//         if (err.message.includes('already booked') || err.message.includes('not found')) {
//           return res.status(400).json({ message: err.message });
//         }
//         res.status(500).json({ message: 'Server error' });
//       }
// });

router.post('/book/:id', async (req, res) => {
  try {
    const { seats, paymentId, email } = req.body;

    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: 'Please select seats to book' });
    }

    // const showtime = await ShowTime.findById(req.params.id);
    const showtime = await ShowTime.findById(req.params.id)
            .populate('movieId', 'title')
            .populate('theatreId');

    const theatre = await Theatre.findById(showtime.theatreId);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check availability
    const unavailableSeats = [];
    seats.forEach(s1 => {
      const seat = showtime.seatMap.seats.find(s => s.seatNumber === s1.seatNumber);
      if (!seat || seat.status !== 'AVAILABLE') {
        unavailableSeats.push(s1.seatNumber);
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

    // Total price
    const totalAmount = seats.reduce((total, s1) => {
      const seat = showtime.seatMap.seats.find(s => s.seatNumber === s1.seatNumber);
      return total + (seat ? seat.price : 0);
    }, 0);

    // Generate PDF path
    const ticketDir = path.join(__dirname, '..', 'tickets');
    if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

    const fileName = `ticket_${Date.now()}.pdf`;
    const filePath = path.join(ticketDir, fileName);

    // Generate PDF
    await generateTicketPDF({
      movieName: showtime.movieId.title,
      name: user.username,
      email: user.email,
      seats: seats.map(seat => seat.seatNumber),
      eventDate: showtime.date,
      showtime: showtime.time,
      venueName: theatre.name,
      venueAddress: theatre.address,
      ticketCount: seats.length,
      price: totalAmount
    }, filePath, "movie");

    // Email ticket
    await sendTicketEmail(user.email, user.username, filePath, "movie");

    // Final response
    res.json({
      success: true,
      message: 'Movie tickets booked & emailed!',
      paymentId,
      totalAmount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;