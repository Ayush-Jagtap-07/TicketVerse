const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., concert, seminar, workshop
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: {
        name: { type: String, required: true },
        address: { type: String, required: true }
    },
    organizer: { type: String },
    ticketsAvailable: { type: Number, required: true },
    price: { type: Number, required: true },
    posterUrl: {
        type: String,
        default: "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg",
        set: (v) => v === "" ? "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg" : v
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
