const express = require('express');
const router = express.Router();
const { verifyJWT, authorizeRoles } = require('../middleware/auth');
const movieController = require("../controllers/movieController");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// Endpoint to retrieve all movie IDs
router.get("/movie-ids", movieController.getAllMovieIds );

// Endpoint to retrieve all movies for dashboard
router.get("/all-movies", movieController.getAllMovies );

// Endpoint to retrieve detailed information about a specific movie by ID
router.get("/:id", movieController.getMovieDetails );

// Endpoint to add a new movie to the dashboard
router.post("/add", upload.single('poster'), movieController.addNewMovie );

// Endpoint to update a movie from the dashboard by movie ID
router.put("/edit/:id", movieController.editMovie );

// Endpoint to delete a movie from the dashboard by movie ID
router.delete("/delete/:id", movieController.deleteMovie );

module.exports = router;