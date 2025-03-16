const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    language: { type: String, required: true },
    cast: [{ type: String }], // Array of actor names
    director: { type: String },
    rating: { type: Number, min: 0, max: 10 },
    posterUrl: { // URL for poster image
        type: String,
        default: "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg",
        set: (v) => v === "" ? "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg" : v
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

