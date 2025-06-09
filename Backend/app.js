if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const passport = require('passport');
const LocalStrategy = require('passport-local');

const movieRouter = require("./routes/movieRoutes");
const eventRouter = require("./routes/eventRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showtimeRouter = require("./routes/showtimeRoutes");
const userRouter = require("./routes/userRoutes");
const generalRouter = require("./routes/generalRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const User = require('./models/userModel');
const ShowTime = require('./models/showTimeModel');
const Theatre = require("./models/theatreModel");
const { verifyJWT, authorizeRoles } = require('./middleware/auth');

// Configure CORS middleware
app.use(
    cors({
        origin: 'https://ticket-verse-ten.vercel.app', // Frontend URL
        credentials: true,              // Allow credentials (cookies)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
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
    await mongoose.connect(process.env.ATLASDB_URL);
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

// -------------------- Showtime APIs --------------------

app.use("/showtime", showtimeRouter);


// -------------------- Payment APIs --------------------

app.use('/payment', paymentRouter);

// -------------------- Booking APIs --------------------

app.use('/booking', bookingRouter);

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

