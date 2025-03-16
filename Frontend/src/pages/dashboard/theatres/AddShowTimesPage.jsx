import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// function AddShowtimesPage() {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [theatres, setTheatres] = useState([]);
//     const [movies, setMovies] = useState([]);
//     const [addedShowtimes, setAddedShowtimes] = useState([]);

//     useEffect(() => {
//         // Fetch theatres and movies
//         const fetchData = async () => {
//             const theatreRes = await axios.get("http://localhost:8080/theatre/all-theatres");
//             const movieRes = await axios.get("http://localhost:8080/movie/all-movies");
//             setTheatres(theatreRes.data);
//             setMovies(movieRes.data);
//         };
//         fetchData();
//     }, []);

//     const onSubmitShowtime  = async (data) => {
//         try {
//             const response = await axios.post("http://localhost:8080/theatre/add-showtime", data);

//             if (response.status === 200) {
//                 // setMessage('Show time added successfully!');
//                 // setIsSuccess(true);
//                 reset(); // Reset the form
//                 alert("Showtime added successfully!");
//             }
//             else {
//                 alert("Failed to add showtime. Status: " + response.status); // Handle non-200 responses
//             }

//         } catch (error) {
//             console.error(error);
//             alert("Error adding showtime:", error.message);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Add Showtimes</h2>
//             <form onSubmit={handleSubmit(onSubmitShowtime)} noValidate>
//                 {/* Select Theatre */}
//                 <div className="mb-3">
//                     <label htmlFor="theatreId" className="form-label">Select Theatre:</label>
//                     <select
//                         id="theatreId"
//                         {...register("theatreId", { required: "Please select a theatre" })}
//                         className="form-select mb-3"
//                     >
//                         <option value="">Select Theatre</option>
//                         {theatres.map((theatre) => (
//                             <option key={theatre._id} value={theatre._id}>
//                                 {theatre.name}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.theatreId && <p>{errors.theatreId.message}</p>}
//                 </div>

//                 {/* Select Movie */}
//                 <div className="mb-3">
//                     <label htmlFor="movieId" className="form-label">Select Movie:</label>
//                     <select
//                         id="movieId"
//                         {...register("movieId", { required: "Please select a movie" })}
//                         className="form-select mb-3"
//                     >
//                         <option value="">Select Movie</option>
//                         {movies.map((movie) => (
//                             <option key={movie._id} value={movie._id}>
//                                 {movie.title}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.movieId && <div className="text-danger">{errors.movieId.message}</div>}
//                 </div>

//                 {/* Add Showtime */}
//                 <div className="mb-3">
//                     <label htmlFor="date" className="form-label">Showtime Date:</label>
//                     <input
//                         id="date"
//                         type="date"
//                         {...register("date", { required: "Showtime date is required" })}
//                         className={`form-control ${errors.date ? 'is-invalid' : ''}`}
//                     />
//                     {errors.date && <div className="text-danger">{errors.date.message}</div>}

//                     <label htmlFor="time" className="form-label mt-3">Showtime Time:</label>
//                     <input
//                     id="time"
//                         type="time"
//                         {...register("time", { required: "Showtime time is required" })}
//                         className={`form-control ${errors.time ? 'is-invalid' : ''}`}
//                     />
//                     {errors.time && <div className="text-danger">{errors.time.message}</div>}

//                     <label htmlFor="ticketsAvailable" className="form-label mt-3">Tickets Available:</label>
//                     <input
//                     id="ticketsAvailable"
//                         type="number"
//                         {...register("ticketsAvailable", { required: "Tickets available is required" })}
//                         className={`form-control ${errors.ticketsAvailable ? 'is-invalid' : ''}`}
//                     />
//                     {errors.ticketsAvailable && <div className="text-danger">{errors.ticketsAvailable.message}</div>}

//                     <label htmlFor="price" className="form-label mt-3">Ticket Price:</label>
//                     <input
//                     id="price"
//                         type="number"
//                         {...register("price", { required: "Ticket price is required" })}
//                         className={`form-control ${errors.ticketPrice ? 'is-invalid' : ''}`}
//                     />
//                     {errors.price && <div className="text-danger">{errors.price.message}</div>}

//                     <button type="submit" className="btn btn-danger mt-3">
//                         Add Showtime
//                     </button>
//                 </div>

//             </form>
//         </div>
//     );
// }

// export default AddShowtimesPage;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

const AddShowtimesPage = () => {
    // const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // const onSubmitShowtime = async (data) => {
    //     try {
    //         const formattedData = {
    //             movieId: data.movieId,
    //             theatreId: data.theatreId,
    //             date: data.date,
    //             time: data.time,
    //             basePrice: Number(data.basePrice) // Ensure basePrice is a number
    //         };

    //         const response = await axios.post("http://localhost:8080/api/showtimes", formattedData);
    //         if (response.status === 201) {
    //             reset();
    //             alert("Showtime added successfully!");
    //         } else {
    //             alert("Failed to add showtime.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error adding showtime: " + error.message);
    //     }
    // };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [theatres, setTheatres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [addedShowtimes, setAddedShowtimes] = useState([]);

    useEffect(() => {
        // Fetch theatres and movies
        const fetchData = async () => {
            const theatreRes = await axios.get("http://localhost:8080/theatre/all-theatres");
            const movieRes = await axios.get("http://localhost:8080/movie/all-movies");
            setTheatres(theatreRes.data);
            setMovies(movieRes.data);
        };
        fetchData();
    }, []);

    const onSubmitShowtime = async (data) => {
        try {
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
        <div>
            <h2>Add Showtime</h2>
            <form onSubmit={handleSubmit(onSubmitShowtime)}>
                {/* <label>Movie ID:</label>
                <input {...register("movieId", { required: true })} />
                {errors.movieId && <span>Movie ID is required</span>}

                <label>Theatre ID:</label>
                <input {...register("theatreId", { required: true })} />
                {errors.theatreId && <span>Theatre ID is required</span>} */}

                {/* Select Theatre */}
                <div className="mb-3">
                    <label htmlFor="theatreId" className="form-label">Select Theatre:</label>
                    <select
                        id="theatreId"
                        {...register("theatreId", { required: "Please select a theatre" })}
                        className="form-select mb-3"
                    >
                        <option value="">Select Theatre</option>
                        {theatres.map((theatre) => (
                            <option key={theatre._id} value={theatre._id}>
                                {theatre.name}
                            </option>
                        ))}
                    </select>
                    {errors.theatreId && <p>{errors.theatreId.message}</p>}
                </div>

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

                {/* <label>Date:</label>
                <input type="date" {...register("date", { required: true })} />
                {errors.date && <span>Date is required</span>}

                <label>Time:</label>
                <input type="time" {...register("time", { required: true })} />
                {errors.time && <span>Time is required</span>}

                <label>Base Price:</label>
                <input type="number" {...register("basePrice", { required: true })} />
                {errors.basePrice && <span>Base price is required</span>} */}

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

