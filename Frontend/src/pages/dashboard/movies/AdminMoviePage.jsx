import React, { useEffect, useState } from 'react';
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

function AdminMoviePage() {

    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);


    // Fetching all movies from the backend database
    useEffect(() => {
        axios.get("http://localhost:8080/movie/all-movies").then((res) => {
            setMovies(res.data);
        })
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    // Filtering movies based on search input 
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handling movie deleting process
    const handleDelete = async (id) => {
        try {
            // Sending delete request to backend server
            await axios.delete(`http://localhost:8080/movie/delete/${id}`);

            // Removing deleted movie from existing movies array
            setMovies(movies.filter(movie => movie._id !== id));

            setShowModal(false);
        } catch (error) {
            console.error("Error deleting movie:", error.message);
        }
    };

    const handleShowModal = (movie) => {
        setMovieToDelete(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMovieToDelete(null);
    };



    return (
        <div className="container bg">
            <h1 className="my-4 text-center">Movies</h1>

            {/* Search bar for movies */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search for movies or events..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="list-group bg">

                {/* Link for adding new movie page */}
                <div className="list-group-item bg">
                    <div className="row">
                        <div className="offset-5 col-2  offset-md-6 col-md-1">
                            <Link to={"/dashboard/movies/add"} className="col-md-1 link"> Add </Link>
                        </div>
                    </div>
                </div>

                {/* List of Movies  */}
                {filteredMovies.map((movie) => (
                    <div className="list-group-item bg" key={movie._id}>
                        <div className="row">
                            <div className="col-2 col-md-1">
                                <img src={movie.posterUrl} style={{ height: "50px", width: "50px" }} alt={movie.title} />
                            </div>
                            <h5 className="mb-1 col-4 col-md-4">{movie.title}</h5>
                            <div className='col-6 offset-md-4 col-md-3 dash-btn-div' >
                                <Link to={`/movie/${movie._id}`} className="link"> Show </Link>
                                <Link to={`/dashboard/movies/edit/${movie._id}`} className="link"> Edit </Link>
                                <button onClick={() => handleShowModal(movie)} className="link btn-delete"> Delete </button>
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
                                <p>Are you sure you want to delete the movie "{movieToDelete?.title}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(movieToDelete._id)}>
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

export default AdminMoviePage;