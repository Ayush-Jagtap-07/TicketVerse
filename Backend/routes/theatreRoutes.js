const express = require('express');
const router = express.Router();
const theatreController = require("../controllers/theatreController");

// Endpoint to retrieve all movie IDs
router.get("/theatre-ids", theatreController.getAllTheatreIds );

// Endpoint to retrieve all theatres for dashboard
router.get("/", theatreController.getAllTheatres);

// Endpoint to retrieve all theatres along with the movies they show
router.get("/all-theatres", theatreController.getAllTheatresWithMovies);

router.get("/:id", theatreController.getTheatreInfo);

// Endpoint to add a new theatre to the dashboard
router.post("/add", theatreController.addNewTheatre);

// Endpoint to delete a theatre from dashboard
router.delete("/delete/:id", theatreController.deleteTheatre);

// Endpoint to add a Single Showtime to a Theatre
router.post('/add-showtime', theatreController.addNewShowTime);

// GET all shows of a specific theatre, sorted by date and time
router.get("/:theatreId/shows", theatreController.getAllShowTimes);

module.exports = router;