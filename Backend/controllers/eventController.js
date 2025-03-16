const Event = require("../models/eventModel");
const { convertTo12HourFormat } = require("../utils/helper");

module.exports.getAllEvents =  async (req, res) => {
    try {
        const allEvents = await Event.find({});
        res.json(allEvents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching event details" });
    }
}

module.exports.getMovieDetails = async (req, res) => {

    try {
        const id = req.params.id;

        // Fetching event details
        const event = await Event.findById(id);
        // console.log(event);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching event details" });
    }
}

module.exports.addNewEvent = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.venue || !req.body.date) {
            throw new ExpressError(400, "Send valid data!");
        }

        // Saving the new event to the database
        const newEvent = new Event(req.body);

        let newTime = convertTo12HourFormat(newEvent.time);
        newEvent.time = newTime;

        await newEvent.save();

        console.log("Event added successfully!");
        res.status(200).json({ message: "Event added successfully!" });
    } catch (error) {
        console.error("Error adding event:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
}

module.exports.updateMovieDetails = async (req, res) => {
    try {
        const id = req.params.id;
        // Updating event details
        await Event.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ message: "Event updated successfully!" });
    } catch (error) {
        console.error("Error updating event:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
}

module.exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully!" });
    } catch (error) {
        console.error("Error deleting event:", error.message);
        res.status(500).json({ error: "Failed to delete event" });
    }
}