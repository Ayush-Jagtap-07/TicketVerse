import React, { useEffect, useState } from 'react';
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

function AdminEventPage() {

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Fetching all events from the backend database
    useEffect(() => {
        axios.get("/event/all-events").then((res) => {
            setEvents(res.data);
        })
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    // Filtering events based on search input 
    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handling event deletion process
    const handleDelete = async (id) => {
        try {
            // Sending delete request to backend server
            await axios.delete(`/event/delete/${id}`);

            // Removing deleted event from existing events array
            setEvents(events.filter(event => event._id !== id));

            setShowModal(false);
        } catch (error) {
            console.error("Error deleting event:", error.message);
        }
    };

    const handleShowModal = (event) => {
        setEventToDelete(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEventToDelete(null);
    };

    return (
        <div className="container bg">
            <h1 className="my-4 text-center">Events</h1>

            {/* Search bar for events */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search for events..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="list-group bg">

                {/* Link for adding new event page */}
                <div className="list-group-item bg">
                    <div className="row">
                        <div className="offset-5 col-2  offset-md-6 col-md-1">
                            <Link to={"/dashboard/events/add"} className="col-md-1 link"> Add </Link>
                        </div>
                    </div>
                </div>

                {/* List of Events  */}
                {filteredEvents.map((event) => (
                    <div className="list-group-item bg" key={event._id}>
                        <div className="row">
                            <div className="col-2 col-md-1">
                                <img src={event.posterUrl} style={{ height: "50px", width: "50px" }} alt={event.name} />
                            </div>
                            <h5 className="mb-1 col-4 col-md-4">{event.name}</h5>
                            <div className='col-6 offset-md-4 col-md-3 dash-btn-div' >
                                <Link to={`/event/${event._id}`} className="link"> Show </Link>
                                <Link to={`/dashboard/events/edit/${event._id}`} className="link"> Edit </Link>
                                <button onClick={() => handleShowModal(event)} className="link btn-delete"> Delete </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Delete Confirmation */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body bg">
                                <p>Are you sure you want to delete the event "{eventToDelete?.name}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(eventToDelete._id)}>
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminEventPage;
