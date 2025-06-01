const Event = require("../models/eventModel");
const User = require("../models/userModel");
const { convertTo12HourFormat, sendTicketEmail, generateTicketPDF } = require("../utils/helper");
const path = require('path');
const fs = require('fs');

module.exports.getAllEvents = async (req, res) => {
    try {
        const allEvents = await Event.find({});
        res.json(allEvents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching event details" });
    }
}

module.exports.getEventDetails = async (req, res) => {

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

exports.bookTickets = async (req, res) => {
    try {
        const { eventId, ticketCount, paymentId } = req.body;
        console.log(req.user)
        const userId = req.user.id;

        // Fetch event
        const event = await Event.findById(eventId);
        if (!event || event.ticketsAvailable < ticketCount) {
            return res.status(400).json({ message: "Not enough tickets available" });
        }

        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update tickets
        event.ticketsAvailable -= ticketCount;
        await event.save();

        // Generate ticket folder
        const ticketDir = path.join(__dirname, '..', 'tickets');
        if (!fs.existsSync(ticketDir)) {
            fs.mkdirSync(ticketDir);
        }

        const fileName = `ticket_${Date.now()}.pdf`;
        const filePath = path.join(ticketDir, fileName);

        console.log("About to generate PDF at:", filePath);

        // Generate ticket PDF
        await generateTicketPDF({
            eventName: event.name,
            name: user.username,
            email: user.email,
            ticketCount,
            eventDate: event.date.toDateString(),
            eventTime: event.time,
            venueName: event.venue.name,
            venueAddress: event.venue.address,
            organizer: event.organizer,
            price: event.price
        }, filePath, "event");
        console.log("PDF generation completed successfully");

        console.log("📨 Preparing to send email...");

        // Send email
        await sendTicketEmail(user.email, user.username, filePath, "event");

        console.log("✅ Email function awaited");

        res.json({ success: true, message: "Tickets booked & emailed!" });

    } catch (error) {
        console.error("Error booking tickets:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

