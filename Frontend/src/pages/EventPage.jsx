import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useParams } from 'react-router-dom';


function EventPage() {

    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/event/${id}`).then((res) => {
            setEvent(res.data);

        }).catch((error) => {
            console.error("Error fetching movie data:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);


    if (loading) return <div>Loading...</div>;
    return (
        <div className="container movie-page mt-5 mb-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={event.posterUrl} alt={event.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-8">
                    <h2 className="card-title mb-4">{event.name}</h2>
                    <p className="card-text"><strong>Category:</strong> {event.category}</p>
                    <p className="card-text"><strong>Description:</strong> {event.description}</p>
                    <p className="card-text"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Time:</strong> {event.time}</p>
                    <p className="card-text"><strong>Venue:</strong> {event.venue.name}, {event.venue.address}</p>
                    <p className="card-text"><strong>Organizer:</strong> {event.organizer}</p>
                    <p className="card-text"><strong>Tickets Available:</strong> {event.ticketsAvailable}</p>
                    <p className="card-text"><strong>Price:</strong> &#8377; {event.price}</p>
                </div>
            </div>
        </div>
    );
}

export default EventPage;