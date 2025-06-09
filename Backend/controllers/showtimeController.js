const ShowTime = require('../models/showTimeModel');
const User = require("../models/userModel");
const Theatre = require("../models/theatreModel");
const Booking = require("../models/bookingModel");
const { convertTo12HourFormat, sendTicketEmail, generateTicketPDF } = require("../utils/helper");
const path = require('path');
const fs = require('fs');

module.exports.getShowDetails = async (req, res) => {
  try {
    const show1 = await ShowTime.findById(req.params.id);
    const show = await ShowTime.findById(req.params.id)
      .populate('movieId', 'title')
      .populate('theatreId');

    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.bookShowTickets = async (req, res) => {
  try {
    const { seats, paymentId, email } = req.body;

    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: 'Please select seats to book' });
    }

    const showtime = await ShowTime.findById(req.params.id)
      .populate('movieId', 'title')
      .populate('theatreId', 'name address');

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
    // const ticketDir = path.join(__dirname, '..', 'tickets');
    // if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

    // const fileName = `ticket_${Date.now()}.pdf`;
    // const filePath = path.join(ticketDir, fileName);

    // Generate PDF
    // await generateTicketPDF({
    //   movieName: showtime.movieId.title,
    //   name: user.username,
    //   email: user.email,
    //   seats: seats.map(seat => seat.seatNumber),
    //   eventDate: showtime.date,
    //   showtime: showtime.time,
    //   venueName: showtime.theatreId.name,
    //   venueAddress: showtime.theatreId.address,
    //   ticketCount: seats.length,
    //   price: totalAmount
    // }, filePath, "movie");

    const pdfBuffer = await generateTicketPDF({
      movieName: showtime.movieId.title,
      name: user.username,
      email: user.email,
      seats: seats.map(seat => seat.seatNumber),
      eventDate: showtime.date,
      showtime: showtime.time,
      venueName: showtime.theatreId.name,
      venueAddress: showtime.theatreId.address,
      ticketCount: seats.length,
      price: totalAmount
    },"movie");
    // Email ticket
    await sendTicketEmail(user.email, user.username, pdfBuffer, "movie");

    // Save booking to database
    const booking =  new Booking({
      userId: user._id,
      movieId: showtime.movieId._id,
      showtimeId: showtime._id,
      theatreId: showtime.theatreId._id,
      ticketCount: seats.length,
      seats: seats.map(seat => seat.seatNumber),
      amountPaid: totalAmount,
      paymentId,
      paymentStatus: 'Success'
    })
    await booking.save();

    // Final response
    res.json({
      success: true,
      message: 'Movie tickets booked & emailed!',
      paymentId,
      totalAmount
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}