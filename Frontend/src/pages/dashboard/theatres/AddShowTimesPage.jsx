import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddShowtimesPage = () => {
    const { id } = useParams();
    // console.log(id);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [theatre, setTheatre] = useState([]);
    const [movies, setMovies] = useState([]);
    const [addedShowtimes, setAddedShowtimes] = useState([]);

    useEffect(() => {
        // Fetch theatres and movies
        const fetchData = async () => {
            const theatreRes = await axios.get(`http://localhost:8080/theatre/${id}`);
            const movieRes = await axios.get("http://localhost:8080/movie/all-movies");
            setTheatre(theatreRes.data);
            setMovies(movieRes.data);
        };
        fetchData();
    }, []);

    const onSubmitShowtime = async (data) => {
        try {
            data.theatreId = theatre._id
            console.log(data);
            const response = await axios.post("http://localhost:8080/theatre/add-showtime", data);

            if (response.status === 201) {
                // setMessage('Show time added successfully!');
                // setIsSuccess(true);
                reset(); // Reset the form
                alert("Showtime added successfully!");
            }
            else {
                alert("Failed to add showtime. Status: " + response.status); // Handle non-200 responses
            }

        } catch (error) {
            console.error(error);
            alert("Error adding showtime:", error.message);
        }
    }

    return (
        <div className="mt-4 container" >
            <h1 className="mt-4 text-center" >{theatre.name}</h1>
            <h2 className="text-center" >Add Showtime</h2>
            <form onSubmit={handleSubmit(onSubmitShowtime)}>

                {/* Select Movie */}
                <div className="mb-3">
                    <label htmlFor="movieId" className="form-label">Select Movie:</label>
                    <select
                        id="movieId"
                        {...register("movieId", { required: "Please select a movie" })}
                        className="form-select mb-3"
                    >
                        <option value="">Select Movie</option>
                        {movies.map((movie) => (
                            <option key={movie._id} value={movie._id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    {errors.movieId && <div className="text-danger">{errors.movieId.message}</div>}
                </div>

                {/* Show date*/}
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Showtime Date:</label>
                    <input
                        id="date"
                        type="date"
                        {...register("date", { required: "Showtime date is required" })}
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    />
                    {errors.date && <div className="text-danger">{errors.date.message}</div>}
                </div>

                {/* Show time */}
                <div className="mb-3">
                    <label htmlFor="time" className="form-label mt-3">Showtime Time:</label>
                    <input
                        id="time"
                        type="time"
                        {...register("time", { required: "Showtime time is required" })}
                        className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                    />
                    {errors.time && <div className="text-danger">{errors.time.message}</div>}
                </div>

                {/* Show base price */}
                <div className="mb-3">
                    <label htmlFor="basePrice" className="form-label mt-3">Ticket Base Price:</label>
                    <input
                        id="basePrice"
                        type="number"
                        {...register("basePrice", { required: "Ticket base price is required" })}
                        className={`form-control ${errors.basePrice ? 'is-invalid' : ''}`}
                    />
                    {errors.basePrice && <div className="text-danger">{errors.basePrice.message}</div>}
                </div>

                <button type="submit" className="btn btn-danger mt-3" >Add Showtime</button>
            </form>
        </div>
    );
};

export default AddShowtimesPage;

