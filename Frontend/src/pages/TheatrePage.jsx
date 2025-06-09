import React, { useState, useEffect } from "react";
import axios from '../api/axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import "./TheatrePage.css";


const TheatreShows = ({ theatreId }) => {
    const { id } = useParams();
    const [shows, setShows] = useState({});
    const [theatre, setTheatre] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get(`/theatre/${id}/shows`);
                setTheatre(response.data.theatre);
                setShows(response.data.shows);
                setSelectedDate(Object.keys(response.data.shows)[0]);
            } catch (error) {
                console.error("Error fetching shows", error);
            }
        };
        fetchShows();
    }, [id]);

    return (
        <div className="container mt-4 theatre-container">
            {theatre && (
                <div className="theatre-header">
                    <h1>{theatre.name}</h1>
                    <p className="theatre-location">{theatre.location}</p>
                </div>
            )}
            <div className="date-selector">
                {Object.keys(shows).map((date) => (
                    <button
                        key={date}
                        className={`date-btn ${selectedDate === date ? "active" : ""}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date}
                    </button>
                ))}
            </div>
            {selectedDate && shows[selectedDate] && (
                <div className="show-list">
                    {shows[selectedDate].map((show) => (
                        <div key={show.showId} className="show-card">
                            <h2 className="movie-title">{show.movie.title} ({show.movie.rating})</h2>
                            <p className="movie-info">{show.movie.language} | {show.movie.format}</p>
                            <div className="show-times">
                                {/* {show.times.map((time, index) => ( */}
                                    <Link to={`/showtime/${show.showId}`} className="show-time-btn">{show.time}</Link>
                                {/* ))} */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default TheatreShows;
