import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';

function BookingDetailsPage() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    useEffect(() => {
        axios.get("/booking/all").then((res) => {
            setBookings(res.data);
        });
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const name = booking.movieId?.title || booking.eventId?.name || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/booking/delete/${id}`);
            setBookings(bookings.filter(b => b._id !== id));
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting booking:", error.message);
        }
    };

    return (
        <div className="container bg">
            <h1 className="my-4 text-center">All Bookings</h1>

            {/* Search */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search by name..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="list-group bg">
                {filteredBookings.map((booking) => (
                    <div className="list-group-item bg" key={booking._id}>
                        <div className="row">
                            <div className="col-md-2 fw-bold">
                                {booking.movieId?.title || booking.eventId?.name}
                            </div>
                            <div className="col-md-2">{booking.userId?.username}</div>
                            <div className="col-md-2">{booking.movieId ? "Movie" : "Event"}</div>
                            <div className="col-md-2">{booking.ticketCount} tickets</div>
                            <div className="col-md-2">₹{booking.amountPaid}</div>
                            <div className="col-md-2 dash-btn-div">
                                <button className="link btn-delete" onClick={() => { setBookingToDelete(booking); setShowModal(true); }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body bg">
                                <p>Delete booking for "{bookingToDelete?.movieId?.title || bookingToDelete?.eventId?.name}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(bookingToDelete._id)}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingDetailsPage;