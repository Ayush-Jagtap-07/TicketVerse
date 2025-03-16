const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");

// Endpoint to retrieve all movies and events for the home page
router.get("/home", generalController.getHomeData );

// Endpoint to retrieve dashboard statistics (movie, event, user and theatre counts)
router.get("/dashboard", generalController.getDashboardStats );

module.exports = router;
