const mongoose = require("mongoose");

// const showTimeSchema = new mongoose.Schema({
//     movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
//     theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
//     date: { type: Date, required: true },
//     times: [
//         {
//             time: { type: String, required: true }, // e.g., "10:00 AM"
//             ticketsAvailable: { type: Number, required: true },
//             price: { type: Number, required: true },
//         }
//     ]
// });


// models/Showtime.js
const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
    },
    row: {
        type: String,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['STANDARD', 'PREMIUM', 'VIP'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'BOOKED'],
        default: 'AVAILABLE'
    }
});

const showTimeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    seatMap: {
        seats: [seatSchema],
        availableCount: {
            type: Number,
            default: 0
        },
        bookedCount: {
            type: Number,
            default: 0
        }
    }
    // seatMap: {
    //     rows: [{
    //         rowNumber: String,
    //         isAisleRow: { type: Boolean, default: false },
    //         seats: [seatSchema]
    //     }],
    //     availableCount: {
    //         type: Number,
    //         default: 0
    //     },
    //     bookedCount: {
    //         type: Number,
    //         default: 0
    //     }
    // }
});

// Utility method to generate seat map based on theatre layout
showTimeSchema.methods.generateSeatMap = async function () {
    console.log(`Fetching Theatre with ID: ${this.theatreId}`);
    const theatre = await mongoose.model('Theatre').findById(this.theatreId);
    if (!theatre) throw new Error('Theatre not found');

    const seats = [];
    const { totalRows, seatsPerRow, categories, aisles } = theatre.layout;

    for (let row = 1; row <= totalRows; row++) {
        const rowLabel = String.fromCharCode(65 + row - 1); // A, B, C, etc.

        for (let col = 1; col <= seatsPerRow; col++) {
            // Skip if seat is in aisle
            if (aisles.columns.includes(col) || aisles.rows.includes(row)) continue;

            // Determine category and price
            const category = categories.find(cat =>
                row >= cat.rowsRange.start && row <= cat.rowsRange.end
            );

            if (category) {
                seats.push({
                    seatNumber: `${rowLabel}${col}`,
                    row: rowLabel,
                    column: col,
                    category: category.name,
                    price: this.basePrice * (
                        category.name === 'VIP' ? 2 :
                            category.name === 'PREMIUM' ? 1.5 : 1
                    ),
                    status: 'AVAILABLE'
                });
            }
        }
    }

    this.seatMap.seats = seats;
    this.seatMap.availableCount = seats.length;
    return this;
};



// showTimeSchema.methods.generateSeatMap = async function () {
//     const theatre = await mongoose.model('Theatre').findById(this.theatreId);
//     if (!theatre) throw new Error('Theatre not found');
//     const { totalRows, seatsPerRow, categories, aisles } = theatre.layout;
//     let seatMap = [];
//     let rowLabels = {};

//     // Assign row labels from top to bottom
//     categories.sort((a, b) => a.rowsRange.start - b.rowsRange.start);
//     categories.forEach(category => {
//         for (let i = category.rowsRange.start; i <= category.rowsRange.end; i++) {
//             rowLabels[i] = { name: category.name, price: category.basePrice };
//         }
//     });

//     // Generate seat structure (from back row to front row for traditional layout)
//     for (let row = 1; row <= totalRows; row++) {
//         // Check if this is an aisle row
//         if (aisles.rows.includes(row)) {
//             seatMap.push([{ isAisleRow: true, rowNumber: row }]);
//             continue;
//         }

//         let rowSeats = [];
//         for (let col = 1; col <= seatsPerRow; col++) {
//             // Check if this position is an aisle column
//             if (aisles.columns.includes(col)) {
//                 rowSeats.push({ isAisleColumn: true, column: col });
//                 continue;
//             }

//             const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
//             rowSeats.push({
//                 seatNumber,
//                 row: String.fromCharCode(64 + row),
//                 rowNumber: row,
//                 column: col,
//                 category: rowLabels[row]?.name || 'STANDARD',
//                 price: rowLabels[row]?.price || 100,
//                 status: 'AVAILABLE',
//             });
//         }
//         seatMap.push(rowSeats);
//     }
//     this.seatMap.seats = seatMap;
//     this.seatMap.availableCount = seatMap.length * seatMap[0].length;
//     return this;
//     // return seatMap;
// }

// showTimeSchema.methods.generateSeatMap = async function () {
//     const theatre = await mongoose.model('Theatre').findById(this.theatreId);
//     if (!theatre) throw new Error('Theatre not found');
//     const { totalRows, seatsPerRow, categories, aisles } = theatre.layout;
//     let seatMap = [];
//     let rowLabels = {};

//     // Assign row labels from top to bottom
//     categories.sort((a, b) => a.rowsRange.start - b.rowsRange.start);
//     categories.forEach(category => {
//         for (let i = category.rowsRange.start; i <= category.rowsRange.end; i++) {
//             rowLabels[i] = { name: category.name, price: category.basePrice };
//         }
//     });

//     // Generate seat structure (from back row to front row for traditional layout)
//     for (let row = 1; row <= totalRows; row++) {
//         let rowData = { rowNumber: row, isAisleRow: false, seats: [] };

//         // Check if this is an aisle row
//         if (aisles.rows.includes(row)) {
//             rowData.isAisleRow = true;
//             seatMap.push(rowData);
//             continue;
//         }

//         for (let col = 1; col <= seatsPerRow; col++) {
//             // Check if this position is an aisle column
//             if (aisles.columns.includes(col)) {
//                 rowData.seats.push({ isAisle: true, column: col });
//                 continue;
//             }

//             const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
//             rowData.seats.push({
//                 seatNumber,
//                 row: String.fromCharCode(64 + row),
//                 column: col,
//                 category: rowLabels[row]?.name || 'STANDARD',
//                 price: rowLabels[row]?.price || 100,
//                 status: 'AVAILABLE',
//             });
//         }
//         seatMap.push(rowData);
//     }
//     this.seatMap.rows = seatMap;
//     this.seatMap.availableCount = seatMap.reduce((sum, row) => sum + row.seats.filter(seat => !seat.isAisle).length, 0);
//     return this;
// };

// Method to book seats
showTimeSchema.methods.bookSeats = async function (seats) {
    if (!seats || !seats.length) {
        throw new Error('No seats specified for booking');
    }
    const seatNumbers = seats.map(seat => seat.seatNumber);

    // Verify all seats are available before booking
    const seatsToBook = this.seatMap.seats.filter(seat =>
        seatNumbers.includes(seat.seatNumber)
    );

    if (seatsToBook.length !== seatNumbers.length) {
        throw new Error('One or more selected seats not found');
    }

    if (seatsToBook.some(seat => seat.status === 'BOOKED')) {
        throw new Error('One or more selected seats are already booked');
    }

    // Update seat status
    const updatedSeats = this.seatMap.seats.map(seat => {
        if (seatNumbers.includes(seat.seatNumber)) {
            return {
                ...seat.toObject(),
                status: 'BOOKED'
            };
        }
        return seat;
    });

    this.seatMap.seats = updatedSeats;
    this.seatMap.availableCount = updatedSeats.filter(s => s.status === 'AVAILABLE').length;
    this.seatMap.bookedCount = updatedSeats.filter(s => s.status === 'BOOKED').length;

    return this.save();
};



const ShowTime = mongoose.model('ShowTime', showTimeSchema);
module.exports = ShowTime;