import React, { useState, useEffect } from "react";
import axios from '../api/axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import SeatSelection from './SeatMap';

function ShowTimePage() {

    const { id } = useParams();
    // console.log(id);
    const [showtime, setShowtime] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
            if (!id) {
                console.log("No ID found in useParams");
                return;
            }
            try {
                const showtimeResponse = await axios.get(`/showtime/${id}`);
                // console.log('showtime response :', showtimeResponse);
                setShowtime(showtimeResponse.data);
            } catch (error) {
                console.error("Error fetching show details", error);
                if (error.response) {
                    console.error("Response Data:", error.response.data);
                    console.error("Status Code:", error.response.status);
                }
            }
        };
        fetchShows();
    }, [id]);
    // console.log(showtime);

    const getCategoryStyle = (category) => {
        switch (category) {
            case 'VIP': return { bgClass: 'bg-danger', textClass: 'text-white', borderClass: 'border-danger' };
            case 'PREMIUM': return { bgClass: 'bg-warning', textClass: 'text-dark', borderClass: 'border-warning' };
            case 'STANDARD': return { bgClass: 'bg-info', textClass: 'text-white', borderClass: 'border-info' };
            default: return { bgClass: 'bg-secondary', textClass: 'text-white', borderClass: 'border-secondary' };
        }
    };

    // const getTotalPrice = () => {
    //     let total = 0;
    //     selectedSeats.forEach(seatNum => {
    //         // Find the seat in our map
    //         for (const row of seatMap) {
    //             if (Array.isArray(row)) {
    //                 const seat = row.find(s => s.seatNumber === seatNum);
    //                 if (seat) {
    //                     total += seat.price;
    //                     break;
    //                 }
    //             }
    //         }
    //     });
    //     return total;
    // };
    // Callback function to receive selected seats from SeatSelection
    const getTotalPrice = () => selectedSeats.reduce((total, seat) => total + seat.price, 0);

    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);
        console.log("Selected Seats in Parent:", seats);
    };

    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert("Please select seats first!");
            return;
        }
        try {
            await axios.post(`/showtime/book/${id}`, { seats: selectedSeats });
            alert("Booking successful!");
            window.location.reload();
        } catch (error) {
            console.error("Error booking seats", error);
        }
    };

    if (showtime && showtime.theatreId) {
        return (
            <div className="container bg">
                <h1 className="my-4 text-center">{showtime.theatreId.name}</h1>
                <p className="text-center"><strong>Address:</strong> {showtime.theatreId.address}</p>
                <h3 className="text-center">{showtime.movieId.title}</h3>
                <SeatSelection
                    theatreLayout={showtime.theatreId.layout}
                    seats={showtime.seatMap.seats}
                    onSeatSelect={handleSeatSelection} />


                {/* Selected Seats Summary */}
                <div className="card mt-4">
                    <div className="card-body">
                        <h3 className="card-title h5">Your Selection</h3>
                        {selectedSeats.length > 0 ? (
                            <div>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {selectedSeats.map(seat => {
                                        const categoryStyle = getCategoryStyle(seat.category);

                                        return (
                                            <span key={seat.seatNumber} className={`badge ${categoryStyle.bgClass} ${categoryStyle.textClass} py-2 px-3`}>
                                                {seat.seatNumber} - ₹{seat.price}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div>
                                        <div className="text-muted small">Total Seats: {selectedSeats.length}</div>
                                        <div className="fw-bold fs-5">Total: ₹{getTotalPrice()}</div>
                                    </div>
                                    <button className="btn btn-primary mt-2 mt-md-0" onClick={handleBooking}>
                                        Continue to Checkout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted">No seats selected. Click on available seats to select them.</p>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        <p>Loading...</p>
    };

}

export default ShowTimePage;