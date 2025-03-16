// const mongoose = require("mongoose");

// const theatreSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     capacity: { type: String },
//     movies: [
//         {
//             movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
//             showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }] // Reference to Showtime model
//         }
//     ],
// });


// models/Theatre.js
const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  // Define the theater layout that will be used as a template for showtimes
  layout: {
    totalRows: { 
      type: Number, 
      required: true 
    },
    seatsPerRow: { 
      type: Number, 
      required: true 
    },
    categories: [{
      name: { 
        type: String, 
        enum: ['STANDARD', 'PREMIUM', 'VIP'],
        required: true 
      },
      rowsRange: {
        start: { type: Number, required: true },
        end: { type: Number, required: true }
      },
      basePrice: { 
        type: Number, 
        required: true 
      }
    }],
    aisles: {
      rows: [Number],    // Rows that should have gaps
      columns: [Number]  // Columns that should have gaps
    },
    disabledSeats: [String] // Permanently unavailable seats
  },
  movies: [{
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    showtimes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showtime'
    }]
  }]
});


const Theatre = mongoose.model('Theatre', theatreSchema);
module.exports = Theatre;