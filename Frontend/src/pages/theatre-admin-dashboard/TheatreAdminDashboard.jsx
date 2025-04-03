import React, { useState, useEffect } from "react";
import axios from '../../api/axios';
import { Outlet, useLocation, Link } from "react-router-dom";
import "../TheatrePage.css";
import { useAuth } from '../../context/AuthContext';
import TheatreAdminSeatMap from './TheatreAdminSeatMap'

const TheatreShows = ({ theatreId }) => {
    const { user } = useAuth();
    const [theatre, setTheatre] = useState(null);
    const location = useLocation();

    // Check if we are on a nested route (edit/addShowTimes)
    const isNestedRoute = location.pathname.includes("theatre");


    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get(`/theatre/admin-theatre-info/${user.id}`);
                console.log(response.data);
                setTheatre(response.data);
            } catch (error) {
                console.error("Error fetching shows", error);
            }
        };
        fetchShows();
    }, [user]);



    return (
        <div className="container mt-4">
            {theatre && (
                <>
                    <h1 className="text-center" >{theatre.name}</h1>
                    <p className="text-center" >{theatre.address}</p>

                    {/* Show Seat Map only if it's NOT a nested route */}
                    {!isNestedRoute && (
                        <>
                            <div className="d-flex justify-content-center mb-3">
                                <Link to={`/adminDashboard/theatre/edit/${theatre._id}`} className="btn btn-danger me-2">
                                    Edit Theatre
                                </Link>
                                <Link to={`/adminDashboard/theatre/addShowTimes/${theatre._id}`} className="btn btn-danger">
                                    Add Showtimes
                                </Link>
                            </div>
                            <TheatreAdminSeatMap theatreLayout={theatre.layout} />
                        </>
                    )}

                    {/* Nested routes will be shown here */}
                    <Outlet />
                </>
            )}
        </div>


    );

    // return (
    //     <div className="container mt-4">
    //         {theatre && (
    //             <>
    //                 <h1 className="text-center">{theatre.name}</h1>
    //                 <p className="text-center">{theatre.address}</p>

    //                 {location.pathname.includes("theatre") ? (
    //                     <Outlet />
    //                 ) : (
    //                     <>
    //                         <div className="d-flex justify-content-center">
    //                             <Link 
    //                                 to={`/adminDashboard/theatre/edit/${theatre._id}`} 
    //                                 className="btn btn-danger text-center"
    //                             >
    //                                 Edit
    //                             </Link>
    //                         </div>
    //                         <TheatreAdminSeatMap theatreLayout={theatre.layout} />
    //                     </>
    //                 )}
    //             </>
    //         )}
    //     </div>
    // );

    return (
        location.pathname.includes("theatre") ? (
            <div className="container mt-4">
                {theatre && (
                    <>
                        <h1 className="text-center">{theatre.name}</h1>
                        <p className="text-center">{theatre.address}</p>
                        <Outlet />

                    </>
                )}
            </div>
        ) : (
            <div className="container mt-4">
                {theatre && (
                    <>
                        <h1 className="text-center">{theatre.name}</h1>
                        <p className="text-center">{theatre.address}</p>
                        <div className="d-flex justify-content-center">
                            <Link
                                to={`/adminDashboard/theatre/edit/${theatre._id}`}
                                className="btn btn-danger text-center"
                            >
                                Edit
                            </Link>
                        </div>
                        <TheatreAdminSeatMap theatreLayout={theatre.layout} />

                    </>
                )}
            </div>
        )
    )

};


export default TheatreShows;