// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// function TheatrePage() {
//     const id = useParams();
//     const [theatre, setTheatre] = useState();

//     useEffect(() => {
//         axios.get(`http://localhost:8080/theatre/${id}`).then((res) => {
//             setTheatre(res.data);
//         }).catch((err) => {
//             console.error("Error fetching theatres:", err.message);
//         });
//     }, []);



//     return (
//         <div className="container bg">
//             <h1 className="my-4 text-center">Theatres</h1>
//         </div>
//     );
// }

// export default TheatrePage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import SeatSelection from './SeatMap';

// function TheatrePage() {
//     const { id } = useParams();
//     console.log(id);
//     const [theatre, setTheatre] = useState(null);

//     useEffect(() => {
//         axios.get(`http://localhost:8080/theatre/${id}`)
//             .then((res) => { 
//                 console.log(res);
//                 console.log(res.data.layout);
//                 setTheatre(res.data) 
//             })
//             .catch((err) => console.error("Error fetching theatre:", err.message));
//     }, [id]);

//     if (!theatre) return <div className="container text-center">Loading...</div>;

//     return (
//         <div className="container bg">
//             <h1 className="my-4 text-center">{theatre.name}</h1>
//             <p className="text-center"><strong>Address:</strong> {theatre.address}</p>
//             <h3 className="text-center">Seat Map</h3>
//             <SeatSelection theatreLayout={theatre.layout} />
//         </div>
//     );
// }

// export default TheatrePage;


import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from '../api/axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import "./TheatrePage.css";

// const TheatreShows = ({ theatreId }) => {
//     const { id } = useParams();
//   const [shows, setShows] = useState({});
//   const [theatre, setTheatre] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         const response = await axios.get(`/theatre/${id}/shows`);
//         setTheatre(response.data.theatre);
//         setShows(response.data.shows);
//         setSelectedDate(Object.keys(response.data.shows)[0]);
//       } catch (error) {
//         console.error("Error fetching shows", error);
//       }
//     };

//     fetchShows();
//   }, [theatreId]);

//   return (
//     <div className="container mt-4">
//       {theatre && (
//         <h1 className="h3 mb-4">{theatre.name}</h1>
//       )}
//       <div className="btn-group mb-4">
//         {Object.keys(shows).map((date) => (
//           <button
//             key={date}
//             className={`btn ${selectedDate === date ? "btn-primary" : "btn-secondary"}`}
//             onClick={() => setSelectedDate(date)}
//           >
//             {date}
//           </button>
//         ))}
//       </div>
//       {selectedDate && shows[selectedDate] && (
//         <div>
//           {shows[selectedDate].map((show) => (
//             <div key={show.showId} className="card mb-3 p-3">
//               <h2 className="h5">{show.movie.title}</h2>
//               <p className="text-muted">{show.movie.language} | {show.movie.format}</p>
//               <p className="fw-bold">Time: {show.time}</p>
//               <p className="fw-bold">Base Price: ₹{show.basePrice}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

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
