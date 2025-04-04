import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useParams } from 'react-router-dom';


function EventPage() {

    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [ticketCount, setTicketCount] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/event/${id}`).then((res) => {
            setEvent(res.data);

        }).catch((error) => {
            console.error("Error fetching movie data:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    // const handleSubmit = () => {
    //     if (!ticketCount || ticketCount === 0) return console.log("Enter value");
    //     console.log(typeof (ticketCount));

    //     let data = {
    //         eventId: id,
    //         ticketCount: ticketCount
    //     }

    //         axios.post(`http://localhost:8080/event/book/${id}`, data).catch((error) => {
    //             console.error("Error booking event:", error);
    //         });

    // }

    const handleSubmit = async () => {
        if (!ticketCount || Number(ticketCount) <= 0) {
            console.log("Enter a valid number of tickets");
            return;
        }
    
        const data = {
            eventId: id,
            ticketCount: Number(ticketCount),
        };
    
        try {
            const response = await axios.post(`http://localhost:8080/event/book/${id}`, data);
            console.log("Booking successful:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error booking event:", error.response?.data || error.message);
        }
    };
    


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

                    {/* Tickets Available */}
                    <div className="mb-3 col-md-4">
                        <label htmlFor="tickets" className="form-label">Enter number of tickets</label>
                        <input
                            type="number"
                            value={ticketCount}
                            id="tickets"
                            onChange={(e) => { setTicketCount(Number(e.target.value)) }}
                            // {...register('ticketsAvailable', { required: 'Tickets Available is required' })}
                            placeholder="Enter number of tickets"
                            // ${errors.ticketsAvailable ? 'is-invalid' : ''}
                            className={`form-control `}
                        />
                        {/* {errors.ticketsAvailable && (
                            <div className="invalid-feedback">{errors.ticketsAvailable.message}</div>
                        )} */}

                        {/* Submit Button */}
                        <button type="submit" onClick={handleSubmit} className="btn btn-danger mt-3">
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventPage;