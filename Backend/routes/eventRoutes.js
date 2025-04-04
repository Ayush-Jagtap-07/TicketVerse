const express = require('express');
const router = express.Router();
const eventController = require("../controllers/eventController");

// Endpoint to retrieve all events for dashboard
router.get("/all-events", eventController.getAllEvents);

// Endpoint to retrieve details of a specific event by ID
router.get("/:id", eventController.getMovieDetails);

// Endpoint to add a new event to the dashboard
router.post("/add", eventController.addNewEvent);

// Endpoint to update an event from the dashboard by event ID
router.put("/edit/:id", eventController.updateMovieDetails);

// Endpoint to delete an event from the dashboard by event ID
router.delete("/delete/:id", eventController.deleteEvent);

router.post("/book/:id", eventController.bookTickets);

module.exports = router;