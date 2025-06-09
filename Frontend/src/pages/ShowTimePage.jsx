import React, { useState, useEffect } from "react";
import axios from '../api/axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import SeatSelection from './SeatMap';
import { useAuth } from '../context/AuthContext';

function ShowTimePage() {

    const { id } = useParams();
    // console.log(id);
    const [showtime, setShowtime] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchShows = async () => {
            if (!id) {
                console.log("No ID found in useParams");
                return;
            }
            try {
                const showtimeResponse = await axios.get(`/showtime/${id}`);
                console.log('showtime response :', showtimeResponse);
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

    // Callback function to receive selected seats from SeatSelection
    const getTotalPrice = () => selectedSeats.reduce((total, seat) => total + seat.price, 0);

    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);
        console.log("Selected Seats in Parent:", seats);
    };

    const handleMoviePayment = async () => {

        if (selectedSeats.length === 0) {
            alert("Please select seats first!");
            return;
        }
        try {
            const totalAmount = getTotalPrice();

            console.log(totalAmount);

            const res = await axios.post('/payment/create-order', {
                amount: totalAmount,
            });

            const options = {
                key: "rzp_test_QpTQbcYP2DIhAx",
                amount: res.data.amount,
                currency: "INR",
                name: "TicketVerse",
                description: "Movie Ticket Booking",
                order_id: res.data.id,
                handler: async function (response) {
                    await axios.post(`/showtime/book/${id}`, { seats: selectedSeats, paymentId: response.razorpay_payment_id, email: user.email, });
                    window.location.reload();
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

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
                                    <button className="btn btn-primary mt-2 mt-md-0" onClick={handleMoviePayment}>
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