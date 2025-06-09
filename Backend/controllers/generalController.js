const Movie = require("../models/movieModel");
const Event = require("../models/eventModel");
const Theatre = require("../models/theatreModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");

// Get all movies and events for home page
module.exports.getHomeData = async (req, res) => {
    try {
        const allMovies = await Movie.find({});
        const allEvents = await Event.find({});

        res.json({ movies: allMovies, events: allEvents });
    } catch (error) {
        console.error("Error fetching home data:", error);
        res.status(500).json({ message: "Failed to fetch home data. Please try again." });
    }
};

// Get dashboard statistics
module.exports.getDashboardStats = async (req, res) => {
    try {
        const [movieCount, eventCount, theatreCount, userCount, bookingCount] = await Promise.all([
            Movie.countDocuments({}),
            Event.countDocuments({}),
            Theatre.countDocuments({}),
            User.countDocuments({}),
            Booking.countDocuments({})
        ]);

        res.json({ movieCount, eventCount, theatreCount, userCount, bookingCount });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Failed to fetch dashboard statistics." });
    }
};


