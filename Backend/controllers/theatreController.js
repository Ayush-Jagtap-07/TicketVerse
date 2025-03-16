const Theatre = require("../models/theatreModel");
const Movie = require("../models/movieModel");
const ShowTime = require("../models/showTimeModel");
const { convertTo12HourFormat } = require("../utils/helper");

const ExpressError = require("../utils/ExpressError");

module.exports.getAllTheatreIds = async (req, res) => {
    const allTheatre = await Theatre.find({});
    const allIds = allTheatre.map(movie => movie._id);
    console.log(allIds);
}

module.exports.getTheatreInfo = async (req, res) => {
    try {
        const { id } = req.params; // Get theatre ID from request parameters
        // console.log(id);
        const theatre = await Theatre.findById(id);
        // .populate("movies.movieId ShowTime")
        // const theatre = await Theatre.findById(id)
        //     .populate("movies.movieId")
        //     .populate("movies.showtimes");
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }

        res.status(200).json(theatre);
    } catch (error) {
        console.error("Error fetching theatre info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getAllTheatres = async (req, res) => {
    try {
        const allTheatres = await Theatre.find({});
        res.json(allTheatres);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching movie details" });
    }
}

module.exports.getAllTheatresWithMovies = async (req, res) => {
    const allTheatres = await Theatre.find({}).populate('movies.movieId');
    res.json(allTheatres);
}

// module.exports.addNewTheatre = async (req, res) => {
//     try {
//         // Validate request body
//         if (!req.body.name || !req.body.address) {
//             throw new ExpressError(400, "Send valid data!");
//         }

//         // Saving the new event to the database
//         const newTheatre = new Theatre(req.body);

//         await newTheatre.save();

//         console.log("Theatre added successfully!");
//         res.status(200).json({ message: "Event added successfully!" });
//     } catch (error) {
//         console.error("Error adding event:", error.message);
//         res.status(error.status || 500).json({ error: error.message });
//     }
// }

module.exports.addNewTheatre = async (req, res) => {
    try {
        const { name, address, layout } = req.body;

        // Validate required fields
        if (!name || !address || !layout || !layout.totalRows || !layout.seatsPerRow || !layout.categories) {
            throw new ExpressError(400, "Missing required theatre details!");
        }

        // Validate categories
        if (!Array.isArray(layout.categories) || layout.categories.length === 0) {
            throw new ExpressError(400, "At least one seat category is required!");
        }

        // Ensure categories contain valid properties
        layout.categories.forEach(category => {
            if (!category.name || !category.rowsRange || category.rowsRange.start == null || category.rowsRange.end == null || category.basePrice == null) {
                throw new ExpressError(400, "Invalid category details!");
            }
        });

        // Default optional fields
        layout.aisles = layout.aisles || { rows: [], columns: [] };
        layout.disabledSeats = layout.disabledSeats || [];

        // Create a new theatre
        const newTheatre = new Theatre({ name, address, layout });

        await newTheatre.save();

        console.log("Theatre added successfully!");
        res.status(200).json({ message: "Theatre added successfully!" });
    } catch (error) {
        console.error("Error adding theatre:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports.deleteTheatre = async (req, res) => {
    try {
        const { id } = req.params;
        await Theatre.findByIdAndDelete(id);
        res.status(200).json({ message: "Theatre deleted successfully!" });
    } catch (error) {
        console.error("Error deleting theatre:", error.message);
        res.status(500).json({ error: "Failed to delete theatre" });

    }
};

// module.exports.addNewShowTime = async (req, res) => {

//     try {
//         const { movieId, theatreId, date, time, ticketsAvailable, price } = req.body;

//         // Validate inputs
//         if (!theatreId || !movieId || !date || !time || ticketsAvailable == null || price == null) {
//             return res.status(400).json({ message: "Invalid input. Ensure all fields are filled." });
//         }

//         let newTime = convertTo12HourFormat(time);
//         console.log(movieId, theatreId, date, newTime, ticketsAvailable, price);

//         // Find the theatre
//         const theatre = await Theatre.findById(theatreId);
//         if (!theatre) {
//             return res.status(404).json({ message: "Theatre not found." });
//         }

//         // Find the movie
//         const movie = await Movie.findById(movieId);
//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found." });
//         }

//         // Find or add the movie entry in the theatre
//         let movieEntry = theatre.movies.find(m => m.movieId.toString() === movieId);
//         if (!movieEntry) {
//             movieEntry = { movieId, showtimes: [] };
//             await theatre.movies.push(movieEntry);
//         }

//         // Find or add the date entry in the movie's showtimes
//         let dateEntry = movieEntry.showtimes.find(showtime =>
//             new Date(showtime.date).toDateString() === new Date(date).toDateString()
//         );

//         if (!dateEntry) {
//             dateEntry = { date, times: [{ time: newTime, ticketsAvailable, price }] };
//             await movieEntry.showtimes.push(dateEntry);
//         } else {
//             await dateEntry.times.push({ time: newTime, ticketsAvailable, price });

//         }

//         // Save the updated theatre document
//         await theatre.save();

//         res.status(200).json({ message: "Showtime added successfully." });
//     } catch (error) {
//         console.error("Error adding showtime:", error);
//         res.status(500).json({ message: "An error occurred while adding the showtime." });
//     }
// };

module.exports.addNewShowTime = async (req, res) => {
    try {
        const { movieId, theatreId, date, time, basePrice } = req.body;
        const newtime = convertTo12HourFormat(time);
        let showtime = new ShowTime({
            movieId,
            theatreId,
            date,
            time:newtime,
            basePrice
        });

        // Generate seat map
        showtime = await showtime.generateSeatMap();

        await showtime.save();
        res.status(201).json({ message: "Showtime added successfully!", showtime });
    } catch (error) {
        console.error("Error creating showtime:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.getAllShowTimes = async (req, res) => {
    try {
        const { theatreId } = req.params;
        const theatre = await Theatre.findById(theatreId);
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }
        
        const shows = await ShowTime.find({ theatreId })
            .populate("movieId", "title language format")
            .sort({ date: 1, time: 1 });
        
        const groupedShows = {};
        shows.forEach(show => {
            const dateKey = show.date.toISOString().split("T")[0];
            if (!groupedShows[dateKey]) {
                groupedShows[dateKey] = [];
            }
            groupedShows[dateKey].push({
                movie: show.movieId,
                showId: show._id,
                time: show.time,
                basePrice: show.basePrice,
            });
        });
        console.log(groupedShows);
        
        res.json({ theatre, shows: groupedShows });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}