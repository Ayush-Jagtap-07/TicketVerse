const sampleMovieData = [
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "description": "A thief who steals corporate secrets through dream-sharing technology.",
        "releaseDate": "2010-07-16T00:00:00.000Z",
        "duration": 148,
        "language": "English",
        "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        "director": "Christopher Nolan",
        "rating": 8.8,
        "posterUrl": "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg"
    },
    {
        "title": "The Dark Knight",
        "genre": "Action",
        "description": "Batman faces the Joker, a criminal mastermind who wants to bring Gotham to its knees.",
        "releaseDate": "2008-07-18T00:00:00.000Z",
        "duration": 152,
        "language": "English",
        "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        "director": "Christopher Nolan",
        "rating": 9.0,
        "posterUrl": "https://m.media-amazon.com/images/I/81IfoBox2TL.jpg"
    },
    {
        "title": "Interstellar",
        "genre": "Sci-Fi",
        "description": "A team of explorers travel through a wormhole to ensure humanity's survival.",
        "releaseDate": "2014-11-07T00:00:00.000Z",
        "duration": 169,
        "language": "English",
        "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        "director": "Christopher Nolan",
        "rating": 8.6,
        "posterUrl": "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        "title": "Parasite",
        "genre": "Thriller",
        "description": "A poor family schemes to become employed by a wealthy household.",
        "releaseDate": "2019-05-30T00:00:00.000Z",
        "duration": 132,
        "language": "Korean",
        "cast": ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
        "director": "Bong Joon-ho",
        "rating": 8.6,
        "posterUrl": "https://image.tmdb.org/t/p/original/d626cMo1nnAJJhEftHOWv009Zgg.jpg"
    },
    {
        "title": "Avengers: Endgame",
        "genre": "Action",
        "description": "The Avengers assemble for one final battle against Thanos.",
        "releaseDate": "2019-04-26T00:00:00.000Z",
        "duration": 181,
        "language": "English",
        "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
        "director": "Anthony and Joe Russo",
        "rating": 8.4,
        "posterUrl": "https://m.media-amazon.com/images/I/81piTqX9IfL.jpg"
    }
];

const sampleTheatreData0 = [
    {
        name: "City Pride Cinemas, Pune",
        address: "Pune Maharashtra India",
        "movies": [
            {
                "movieId": "677c0d24239f3cab3ad4c7b5",
                "showtimes": [
                    {
                        "date": "2024-12-21T00:00:00.000Z",
                        "times": [
                            { "time": "10:00 AM", "ticketsAvailable": 50, "price": 12.99 },
                            { "time": "1:00 PM", "ticketsAvailable": 40, "price": 12.99 }
                        ]
                    }
                ]
            },
            {
                "movieId": "677c0d24239f3cab3ad4c7b9",
                "showtimes": [
                    {
                        "date": "2024-12-21T00:00:00.000Z",
                        "times": [
                            { "time": "4:00 PM", "ticketsAvailable": 60, "price": 14.99 },
                            { "time": "7:00 PM", "ticketsAvailable": 50, "price": 14.99 }
                        ]
                    }
                ]
            }
        ]
    }, {
        name: "PVR Cinemas, Mumbai",
        address: "Mumbai Maharashtra India",
        movies: [
            {
                movieId: "677c0d24239f3cab3ad4c7b5",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "10:00 AM", ticketsAvailable: 50, price: 300 },
                            { time: "1:00 PM", ticketsAvailable: 45, price: 300 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "5:00 PM", ticketsAvailable: 40, price: 300 },
                            { time: "8:00 PM", ticketsAvailable: 35, price: 300 },
                        ],
                    },
                ],
            },
            {
                movieId: "677c0d24239f3cab3ad4c7b6",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "11:00 AM", ticketsAvailable: 50, price: 350 },
                            { time: "2:00 PM", ticketsAvailable: 45, price: 350 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "6:00 PM", ticketsAvailable: 40, price: 350 },
                            { time: "9:00 PM", ticketsAvailable: 35, price: 350 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "INOX, Bengaluru",
        address: "Bengaluru Karnataka India",
        movies: [
            {
                movieId: "677c0d24239f3cab3ad4c7b7",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "10:30 AM", ticketsAvailable: 60, price: 280 },
                            { time: "1:30 PM", ticketsAvailable: 55, price: 280 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "5:30 PM", ticketsAvailable: 50, price: 280 },
                            { time: "8:30 PM", ticketsAvailable: 45, price: 280 },
                        ],
                    },
                ],
            },
            {
                movieId: "677c0d24239f3cab3ad4c7b8",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "12:00 PM", ticketsAvailable: 60, price: 320 },
                            { time: "3:00 PM", ticketsAvailable: 55, price: 320 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "6:30 PM", ticketsAvailable: 50, price: 320 },
                            { time: "9:30 PM", ticketsAvailable: 45, price: 320 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Carnival Cinemas, Pune",
        address: "Pune Maharashtra India",
        movies: [
            {
                movieId: "677c0d24239f3cab3ad4c7b9",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "9:00 AM", ticketsAvailable: 40, price: 250 },
                            { time: "12:00 PM", ticketsAvailable: 35, price: 250 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "3:00 PM", ticketsAvailable: 30, price: 250 },
                            { time: "6:00 PM", ticketsAvailable: 25, price: 250 },
                        ],
                    },
                ],
            },
            {
                movieId: "677c0d24239f3cab3ad4c7b8",
                showtimes: [
                    {
                        date: "2024-12-23",
                        times: [
                            { time: "12:00 PM", ticketsAvailable: 60, price: 320 },
                            { time: "3:00 PM", ticketsAvailable: 55, price: 320 },
                        ],
                    },
                    {
                        date: "2024-12-24",
                        times: [
                            { time: "6:30 PM", ticketsAvailable: 50, price: 320 },
                            { time: "9:30 PM", ticketsAvailable: 45, price: 320 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "PVR Cinemas, Pune",
        address: "Pune Maharashtra India",
        "movies": [
            {
                "movieId": "677c0d24239f3cab3ad4c7b5",
                "showtimes": [
                    {
                        "date": "2024-12-22T00:00:00.000Z",
                        "times": [
                            { "time": "3:00 PM", "ticketsAvailable": 70, "price": 15.99 },
                            { "time": "6:00 PM", "ticketsAvailable": 60, "price": 15.99 }
                        ]
                    }
                ]
            },
            {
                "movieId": "677c0d24239f3cab3ad4c7b7",
                "showtimes": [
                    {
                        "date": "2024-12-22T00:00:00.000Z",
                        "times": [
                            { "time": "5:00 PM", "ticketsAvailable": 80, "price": 13.99 },
                            { "time": "8:00 PM", "ticketsAvailable": 50, "price": 13.99 }
                        ]
                    }
                ]
            },
            {
                "movieId": "677c0d24239f3cab3ad4c7b8",
                "showtimes": [
                    {
                        "date": "2024-12-23T00:00:00.000Z",
                        "times": [
                            { "time": "2:00 PM", "ticketsAvailable": 45, "price": 11.99 },
                            { "time": "6:00 PM", "ticketsAvailable": 30, "price": 11.99 }
                        ]
                    }
                ]
            }
        ]
    }
]

const sampleEventData = [
    {
        name: "Tech Conference 2024",
        category: "Technology",
        description: "An annual tech conference featuring the latest advancements in AI, blockchain, and software development.",
        date: new Date("2024-05-20"),
        time: "10:00 AM",
        venue: {
            name: "TechWorld Convention Center",
            address: "123 Innovation Drive, Bangalore. Karnataka",
        },
        organizer: "TechWorld Inc.",
        ticketsAvailable: 300,
        price: 50,
        posterUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/futuristic-tech-conference-poster-design-template-6cc742c91ddf28f6a2405fcf4d537c2b_screen.jpg?ts=1716075044"
    },
    {
        name: "Music Fest 2024",
        category: "Music",
        description: "A live music festival with performances by top bands and artists from around the globe.",
        date: new Date("2024-07-15"),
        time: "5:00 PM",
        venue: {
            name: "Open Air Stage",
            address: "Central Park, 59th St and 5th Ave, Koregaon Park, Pune, Maharashtra",
        },
        organizer: "Global Music Events",
        ticketsAvailable: 500,
        price: 75,
        posterUrl: "https://img.freepik.com/free-vector/abstract-music-festival-poster-template_23-2148233165.jpg"
    },
    {
        name: "Art Expo 2024",
        category: "Exhibition",
        description: "A grand exhibition showcasing contemporary and traditional art from renowned artists.",
        date: new Date("2024-09-10"),
        time: "9:00 AM",
        venue: {
            name: "The Louvre",
            address: "Rue de Rivoli, Paris, France",
        },
        organizer: "Artistry Alliance",
        ticketsAvailable: 200,
        price: 30,
        posterUrl: "https://marketplace.canva.com/EAGQbgp-Niw/2/0/1131w/canva-colorful-brown-creative-illustrative-art-exhibition-poster-V2ynAh_dBJo.jpg"
    },
    {
        name: "Startup Meetup 2024",
        category: "Business",
        description: "A networking event for entrepreneurs and investors to discuss innovative business ideas.",
        date: new Date("2024-03-12"),
        time: "3:00 PM",
        venue: {
            name: "Startup Hub",
            address: "456 Entrepreneurial Ave, Ahemdabad, Gujurat",
        },
        organizer: "Startup Connect",
        ticketsAvailable: 150,
        price: 20,
        posterUrl: "https://images-platform.99static.com/_aWv5XuPIVPOQVj6gJVU2x2ODBk=/0x0:1920x1920/500x500/top/smart/99designs-contests-attachments/130/130390/attachment_130390923"
    },
    {
        name: "Fitness Marathon",
        category: "Sports",
        description: "A day-long fitness marathon featuring yoga, aerobics, and health workshops.",
        date: new Date("2024-06-25"),
        time: "6:00 AM",
        venue: {
            name: "Beachside Arena",
            address: "789 Marine Drive, Mumbai, Maharashtra",
        },
        organizer: "Wellness Co.",
        ticketsAvailable: 400,
        price: 25,
        posterUrl: "https://cdn.create.vista.com/downloads/4007df13-6f9f-46d9-8a2c-bb0c78c738dd_1024.jpeg"
    }
];

const sampleTheatreData = [
    {
        name: "City Pride Cinemas, Pune",
        address: "Pune Maharashtra India",
        layout: {
            totalRows: 15,
            seatsPerRow: 20,
            categories: [
                { name: "VIP", rowsRange: { start: 1, end: 3 }, basePrice: 500 },
                { name: "PREMIUM", rowsRange: { start: 4, end: 8 }, basePrice: 350 },
                { name: "STANDARD", rowsRange: { start: 9, end: 15 }, basePrice: 200 }
            ],
            aisles: { rows: [5, 10], columns: [5, 15] },
            disabledSeats: ["1A", "1B", "15T", "15U"]
        },
        movies: [
            { movieId: "677c0d24239f3cab3ad4c7b5", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b9", showtimes: [] }
        ]
    },
    {
        name: "PVR Cinemas, Mumbai",
        address: "Mumbai Maharashtra India",
        layout: {
            totalRows: 12,
            seatsPerRow: 18,
            categories: [
                { name: "VIP", rowsRange: { start: 1, end: 2 }, basePrice: 550 },
                { name: "PREMIUM", rowsRange: { start: 3, end: 6 }, basePrice: 400 },
                { name: "STANDARD", rowsRange: { start: 7, end: 12 }, basePrice: 250 }
            ],
            aisles: { rows: [4, 8], columns: [4, 14] },
            disabledSeats: ["2C", "12R"]
        },
        movies: [
            { movieId: "677c0d24239f3cab3ad4c7b5", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b6", showtimes: [] }
        ]
    },
    {
        name: "INOX, Bengaluru",
        address: "Bengaluru Karnataka India",
        layout: {
            totalRows: 14,
            seatsPerRow: 22,
            categories: [
                { name: "VIP", rowsRange: { start: 1, end: 3 }, basePrice: 600 },
                { name: "PREMIUM", rowsRange: { start: 4, end: 7 }, basePrice: 450 },
                { name: "STANDARD", rowsRange: { start: 8, end: 14 }, basePrice: 300 }
            ],
            aisles: { rows: [6, 10], columns: [6, 16] },
            disabledSeats: ["1D", "14W"]
        },
        movies: [
            { movieId: "677c0d24239f3cab3ad4c7b7", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b8", showtimes: [] }
        ]
    },
    {
        name: "Carnival Cinemas, Pune",
        address: "Pune Maharashtra India",
        layout: {
            totalRows: 13,
            seatsPerRow: 19,
            categories: [
                { name: "VIP", rowsRange: { start: 1, end: 2 }, basePrice: 480 },
                { name: "PREMIUM", rowsRange: { start: 3, end: 6 }, basePrice: 320 },
                { name: "STANDARD", rowsRange: { start: 7, end: 13 }, basePrice: 220 }
            ],
            aisles: { rows: [4, 9], columns: [3, 17] },
            disabledSeats: ["13S"]
        },
        movies: [
            { movieId: "677c0d24239f3cab3ad4c7b9", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b8", showtimes: [] }
        ]
    },
    {
        name: "PVR Cinemas, Pune",
        address: "Pune Maharashtra India",
        layout: {
            totalRows: 16,
            seatsPerRow: 21,
            categories: [
                { name: "VIP", rowsRange: { start: 1, end: 3 }, basePrice: 520 },
                { name: "PREMIUM", rowsRange: { start: 4, end: 8 }, basePrice: 370 },
                { name: "STANDARD", rowsRange: { start: 9, end: 16 }, basePrice: 230 }
            ],
            aisles: { rows: [5, 11], columns: [7, 18] },
            disabledSeats: ["1A", "16V"]
        },
        movies: [
            { movieId: "677c0d24239f3cab3ad4c7b5", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b7", showtimes: [] },
            { movieId: "677c0d24239f3cab3ad4c7b8", showtimes: [] }
        ]
    }
];

// const sampleShowtimeData = [

// ];
const mongoose = require("mongoose");

const sampleShowtimeData = [
    {
        movieId: "677c0d24239f3cab3ad4c7b5",
        theatreId: "67b5fb67163f05484f40fff9",
        date: new Date("2025-03-04"),
        time: "10:00 AM",
        basePrice: 200
    },
    {
        movieId: "677c0d24239f3cab3ad4c7b6",
        theatreId: "67b5fb68163f05484f40ffff",
        date: new Date("2025-03-04"),
        time: "1:30 PM",
        basePrice: 250
    },
    {
        movieId: "677c0d24239f3cab3ad4c7b7",
        theatreId: "67b5fb68163f05484f410005",
        date: new Date("2025-03-04"),
        time: "4:00 PM",
        basePrice: 220
    },
    {
        movieId: "677c0d24239f3cab3ad4c7b8",
        theatreId: "67b5fb68163f05484f41000b",
        date: new Date("2025-03-04"),
        time: "7:00 PM",
        basePrice: 300
    },
    {
        movieId: "677c0d24239f3cab3ad4c7b9",
        theatreId: "67b5fb68163f05484f410011",
        date: new Date("2025-03-04"),
        time: "9:30 PM",
        basePrice: 280
    }
    // More entries for different dates and times
];

// Generate additional 35 entries with variations in dates, times, and prices


module.exports = { sampleEventData, sampleMovieData, sampleTheatreData, sampleShowtimeData };