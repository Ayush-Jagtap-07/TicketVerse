const Movie = require("../models/movieModel");
const Theatre = require("../models/theatreModel");

module.exports.getAllMovieIds = async (req, res) => {
    const allMovies = await Movie.find({});
    const allIds = allMovies.map(movie => movie._id);
    console.log(allIds);
}

module.exports.getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find({});
        res.json(allMovies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching movie details" });
    }
};

module.exports.getMovieDetails = async (req, res) => {
    try {
        const id = req.params.id;

        // Fetching movie details
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Fetching theaters showing this movie
        const theaters = await Theatre.find({ "movies.movieId": id });
        // , {
        //     name: 1,
        //     address: 1,
        //     "movies.$": 1 // Fetching only the specific movie's showtimes in the theaters
    // }
        // Formatting response
        const response = {
            ...movie.toObject(),
            theaters: theaters.map(theater => ({
                id: theater._id,
                name: theater.name,
                address: theater.address,
                showtimes: theater.movies[0].showtimes
            }))
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching movie details" });
    }
}

module.exports.addNewMovie = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.title || !req.body.cast) {
            throw new ExpressError(400, "Send valid data!");
        }

        // Parse the cast string into an array
        const castString = req.body.cast;
        const castArray = castString.split(',').map(item => item.trim());

        // Construct the movie object
        const newMovieData = {
            ...req.body,
            cast: castArray, // Replace cast string with array
        };

        // Save the new movie to the database
        const newMovie = new Movie(newMovieData);
        await newMovie.save();

        console.log("Movie added successfully!");
        res.status(200).json({ message: "Movie added successfully!" });
    } catch (error) {
        console.error("Error adding movie:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
}

module.exports.editMovie = async (req, res) => {
    try {
        const id = req.params.id;
        // Fetching movie details
        await Movie.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ message: "Movie updated successfully!" });
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
}

module.exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);
        res.status(200).json({ message: "Movie deleted successfully!" });
    } catch (error) {
        console.error("Error deleting movie:", error.message);
        res.status(500).json({ error: "Failed to delete movie" });
    }
}