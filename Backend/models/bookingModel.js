const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre' },

    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },

    ticketCount: { type: Number, required: true },
    seats: [{ type: String }],
    amountPaid: { type: Number, required: true },
    paymentId: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Success' },
    ticketUrl: { type: String }, // relative path or cloud URL
    bookingTime: { type: Date, default: Date.now }
});

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

//   movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShowTime', default: null },
//   showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
//     theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre' },


//   eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },

//   ticketCount: { type: Number, required: true },
//   seats: [{ seatNumber: String }], // Leave empty for event bookings

//   paymentId: { type: String },
//   totalAmount: { type: Number, required: true },
//   bookedAt: { type: Date, default: Date.now }
// });

 const Booking = mongoose.model('Booking', bookingSchema);
 module.exports = Booking;
