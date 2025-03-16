const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Invalid phone number format']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bookings: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
            bookingDate: { type: Date, default: Date.now },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            status: {
                type: String,
                enum: ['confirmed', 'cancelled'],
                default: 'confirmed'
            }
        }
    ]
    , refreshToken: {
        type: String,
        default: null
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;
