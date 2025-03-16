const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const movieRouter = require("./routes/movieRoutes");
const eventRouter = require("./routes/eventRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const userRouter = require("./routes/userRoutes");
const generalRouter = require("./routes/generalRoutes");

const User = require('./models/userModel');
const ShowTime = require('./models/showTimeModel');
const Theatre = require("./models/theatreModel");
const { verifyJWT, authorizeRoles } = require('./middleware/auth');

// Configure CORS middleware
app.use(
    cors({
        origin: 'http://localhost:5173', // Frontend URL
        credentials: true,              // Allow credentials (cookies)
    })
);

// Middleware for parsing URL-encoded data (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Function to connect to MongoDB database
async function main() {
    // Establish connection to the MongoDB database
    await mongoose.connect(process.env.MONGO_URL);
}

main().then(() => {
    console.log("Database Connected")
})

// Start the server and listen on port 8080
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
})

// Basic route to test server and API
app.get("/", (req, res) => {
    res.send("TicketVerse");
})

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------------- General APIs --------------------

app.use("/", generalRouter);

// -------------------- Movie APIs --------------------

app.use("/movie", movieRouter);

// -------------------- Event APIs --------------------

app.use("/event", eventRouter);

// -------------------- Theatre APIs --------------------

app.use("/theatre", theatreRouter);

// -------------------- User APIs --------------------

app.use("/", userRouter);

// app.get('/showtime/:id', async (req, res) => {
//     try {
//         console.log(req.params.id);
//         const show = await ShowTime.findById(req.params.id).populate('theatreId');
//         if (!show) return res.status(404).json({ message: 'Show not found' });
//         console.log(show);
//         res.json(show);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

app.get('/showtime/:id', async (req, res) => {
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

app.post('/showtime/book/:id', async (req, res) => {
    try {
        const { seats } = req.body;
        console.log(seats);
        if (!seats || !Array.isArray(seats) || seats.length === 0) {
          return res.status(400).json({ message: 'Please select seats to book' });
        }
        console.log(req.params.id);
        const showtime = await ShowTime.findById(req.params.id);
        
        if (!showtime) {
          return res.status(404).json({ message: 'Showtime not found' });
        }
        console.log(showtime);
        // Check if all seats are available
        const unavailableSeats = [];
        seats.forEach(s1 => {
            console.log("Searching for seat:", s1.seatNumber);
          const seat = showtime.seatMap.seats.find(s => s.seatNumber === s1.seatNumber);
          console.log('Seats :',seat);
          if (!seat || seat.status !== 'AVAILABLE') {
            unavailableSeats.push(seatNumber);
          }
        });

        console.log('Unavailable seats :', unavailableSeats);
        
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
        //   user: req.user.id,
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