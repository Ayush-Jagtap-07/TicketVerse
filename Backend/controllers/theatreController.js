const Theatre = require("../models/theatreModel");
const Movie = require("../models/movieModel");
const ShowTime = require("../models/showTimeModel");
const User = require("../models/userModel");
const { convertTo12HourFormat } = require("../utils/helper");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");


module.exports.getAllTheatreIds = async (req, res) => {
    try {
        const allTheatres = await Theatre.find({}, '_id name'); // Only fetch _id and name
        const result = allTheatres.map(theatre => ({
            id: theatre._id,
            name: theatre.name
        }));

        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch theatres" });
    }
};

module.exports.getTheatreInfo = async (req, res) => {
    try {
        const { id } = req.params; // Get theatre ID from request parameters
        const theatre = await Theatre.findById(id);
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

module.exports.editTheatre = async (req, res) => {
    try{
    console.log(req.body);
    const id = req.params.id
    await Theatre.findByIdAndUpdate(id, { ...req.body});
    res.status(200).json({ message: "Movie updated successfully!" });
    } catch(error){
        console.error("Error updating theatre:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
}

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

module.exports.addNewShowTime = async (req, res) => {
    try {
        const { movieId, theatreId, date, time, basePrice } = req.body;
        const newtime = convertTo12HourFormat(time);
        let showtime = new ShowTime({
            movieId,
            theatreId,
            date,
            time: newtime,
            basePrice
        });

        // Generate seat map
        showtime = await showtime.generateSeatMap();

        await showtime.save();

        // 🔁 Update the theatre's movies list
        const theatre = await Theatre.findById(theatreId);
        const movieEntry = theatre.movies.find(entry => entry.movieId.toString() === movieId);

        if (movieEntry) {
            movieEntry.showtimes.push(showtime._id);
        } else {
            theatre.movies.push({
                movieId,
                showtimes: [showtime._id]
            });
        }

        await theatre.save();

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

        res.json({ theatre, shows: groupedShows });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports.getAdminTheatreInfo = async (req, res) => {
    try {
        const { userId } = req.params; // Get user ID from request parameters
        if (!userId) {
            return res.status(404).json({ message: "User Id not found" });
        }
        const theatre = await Theatre.findOne({ admin: userId });
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }
        res.status(200).json(theatre);
    } catch (error) {
        console.error("Error fetching admin theatre info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}