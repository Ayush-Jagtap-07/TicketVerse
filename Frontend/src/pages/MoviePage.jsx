import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from '../api/axios';

function MoviePage() {

    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie data:", error.response?.data?.message);
            }
        }
        fetchData();
    }, []);

    // console.log(movie.theaters);

    if (!movie || !movie.cast) {
        return <p>Loading...</p>;
    } else {
        return (
            <div className="container movie-page mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src={movie.posterUrl} alt={movie.title} className="img-fluid rounded shadow" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="bg">{movie.title}</h2>
                        <p><strong>Genre: </strong> {movie.genre}</p>
                        <p><strong>Description: </strong> {movie.description}</p>
                        <p><strong>Release Date: </strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                        <p><strong>Duration: </strong> {movie.duration} minutes</p>
                        <p><strong>Language: </strong> {movie.language}</p>
                        <p><strong>Director: </strong> {movie.director}</p>
                        <p><strong>Cast: </strong> {movie.cast.join(', ')}</p>
                        <p><strong>Rating: </strong> {movie.rating} / 10</p>

                        <h4 className="mt-4">Showtimes</h4>
                        <h4 className="mt-4">Showtimes</h4>

                        {movie.theaters && movie.theaters.length > 0 ? (
            
                            movie.theaters.map((theater, theaterIndex) => (
                                
                                <div key={theaterIndex} className="mb-4">
                                    <Link to={`/theatre/${theater.id}`} ><h5>{theater.name}</h5></Link>
                                    <p><strong>Location: </strong> {theater.address}</p>
                                    {/* {theater.showtimes && theater.showtimes.length > 0 ? (
                                        theater.showtimes.map((showtime, showtimeIndex) => (
                                            <div key={showtimeIndex} className="mb-3">
                                                <h6>{new Date(showtime.date).toLocaleDateString()}</h6>
                                                <ul className="list-group">
                                                    {showtime.times.map((time, timeIndex) => (
                                                        <li key={timeIndex} className="list-group-item bg d-flex justify-content-between align-items-center">
                                                            {time.time}
                                                            <span className="badge bg-primary rounded-pill">{time.ticketsAvailable} Tickets - &#8377; {time.price.toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No showtimes available.</p>
                                    )} */}
                                </div>
                            ))
                        ) : (
                            <p>No theaters available.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default MoviePage;