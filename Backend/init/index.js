const mongoose = require("mongoose");
const { sampleMovieData, sampleEventData, sampleTheatreData, sampleShowtimeData } = require("./data");

const Movie = require("../models/movieModel");
const Event = require("../models/eventModel");
const Theatre = require("../models/theatreModel");
const ShowTime = require("../models/showTimeModel");

async function main() {
    await mongoose.connect();
}
// main().then(() => {
//     console.log("Database Connected");
// }).catch((err) => {
//     console.log(err);
// })

main().then(() => {
    console.log("Database Connected");
    initDB();
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    // await Movie.deleteMany({});
    // await Movie.insertMany(sampleMovieData);
    // await Event.deleteMany({});
    // await Event.insertMany(sampleEventData);
    // await Theatre.deleteMany({});
    // await Theatre.insertMany(sampleTheatreData);
    // await ShowTime.deleteMany({});
    // for (let i = 1; i <= 7; i++) {
    //     sampleShowtimeData.push(
    //         ...[
    //             {
    //                 movieId: "677c0d24239f3cab3ad4c7b5",
    //                 theatreId: "67b5fb67163f05484f40fff9",
    //                 date: new Date(`2025-03-${4 + i}`),
    //                 time: "11:00 AM",
    //                 basePrice: 220
    //             },
    //             {
    //                 movieId: "677c0d24239f3cab3ad4c7b6",
    //                 theatreId: "67b5fb68163f05484f40ffff",
    //                 date: new Date(`2025-03-${4 + i}`),
    //                 time: "2:00 PM",
    //                 basePrice: 240
    //             },
    //             {
    //                 movieId: "677c0d24239f3cab3ad4c7b7",
    //                 theatreId: "67b5fb68163f05484f410005",
    //                 date: new Date(`2025-03-${4 + i}`),
    //                 time: "5:00 PM",
    //                 basePrice: 260
    //             },
    //             {
    //                 movieId: "677c0d24239f3cab3ad4c7b8",
    //                 theatreId: "67b5fb68163f05484f41000b",
    //                 date: new Date(`2025-03-${4 + i}`),
    //                 time: "8:00 PM",
    //                 basePrice: 290
    //             },
    //             {
    //                 movieId: "677c0d24239f3cab3ad4c7b9",
    //                 theatreId: "67b5fb68163f05484f410011",
    //                 date: new Date(`2025-03-${4 + i}`),
    //                 time: "10:30 PM",
    //                 basePrice: 310
    //             }
    //         ]
    //     );
    // }
    // await ShowTime.insertMany(sampleShowtimeData);
    for (const showtimeData of sampleShowtimeData) {
        let showtime = new ShowTime(showtimeData);
        await showtime.generateSeatMap();  // Call the function
        await showtime.save();  // Save after generating seat map
        const theatre = await Theatre.findById(showtimeData.theatreId);
        const movieId = showtimeData.movieId;
        const movieEntry = theatre.movies.find(entry => entry.movieId.toString() === movieId);

        if (movieEntry) {
            movieEntry.showtimes.push(showtime._id);
        } else {
            theatre.movies.push({
                movieId,
                showtimes: [showtime._id]
            });
        }

        await theatre.save();
    }
    console.log("Data Initialized");
    // console.log(sampleMovieData);
    // console.log(sampleEventData);
    // console.log(sampleTheatreData);
}

// initDB();
