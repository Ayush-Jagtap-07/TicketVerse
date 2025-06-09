const express = require('express');
const router = express.Router();
const eventController = require("../controllers/eventController");
const { verifyJWT, authorizeRoles } = require('../middleware/auth');
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// Endpoint to retrieve all events for dashboard
router.get("/all-events", eventController.getAllEvents);

// Endpoint to retrieve details of a specific event by ID
router.get("/:id", eventController.getEventDetails);

// Endpoint to add a new event to the dashboard
router.post("/add", upload.single('poster'), eventController.addNewEvent);
// router.post("/add", upload.single('poster'), );

// Endpoint to update an event from the dashboard by event ID
router.put("/edit/:id", eventController.updateMovieDetails);

// Endpoint to delete an event from the dashboard by event ID
router.delete("/delete/:id", eventController.deleteEvent);

router.post("/book/:id", verifyJWT, eventController.bookTickets);

module.exports = router;