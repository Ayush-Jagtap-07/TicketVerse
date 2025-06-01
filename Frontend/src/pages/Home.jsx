import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    // State variables to store movies and events data
    const [movies, setMovies] = useState([]);
    const [events, setEvents] = useState([]);

    // Fetching movies and events data
    useEffect(() => {
        axios.get("http://localhost:8080/home").then((res) => {
            setMovies(res.data.movies);
            setEvents(res.data.events);
        })
    }, [])


    const [searchTerm, setSearchTerm] = useState('');

    // Filter movies based on search term
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter events based on search term
    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container bg">
            <h1 className="my-4 text-center">Welcome to the TicketVerse !</h1>

            {/* Search bar for movies and events */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search for movies or events..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display filtered movies */}
            <h2>Popular Movies</h2>
            <div className="row">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <div className="col-md-3 mb-4" key={movie._id}>
                            <div className="card bg border" >
                                <img src={movie.posterUrl} className="card-img-top" alt={movie.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">
                                        <strong>Genre:</strong> {movie.genre}<br />
                                        <strong>Rating:</strong> {movie.rating}<br />
                                    </p>
                                    <Link to={`/movie/${movie._id}`} className="btn btn-primary">Book Now</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p>No movies found.</p>
                    </div>
                )}
            </div>

            {/* Display filtered events */}
            <h2>Upcoming Events</h2>
            <div className="row">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div className="col-md-3 mb-4 d-flex" key={event._id}>
                            <div className="card bg border flex-fill d-flex flex-column">
                                <img src={event.posterUrl} className="card-img-top" alt={event.name} style={{ height: '250px', objectFit: 'contain' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{event.name}</h5>
                                    <p className="card-text">
                                        <strong>Type:</strong> {event.category}<br />
                                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                    </p>
                                    <Link to={`/event/${event._id}`} className="btn btn-primary">Book Now</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p>No events found.</ p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Home;
