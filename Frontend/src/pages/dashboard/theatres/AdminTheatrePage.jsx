import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

function AdminTheatrePage() {

    const [theatres, setTheatres] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [theatreToDelete, setTheatreToDelete] = useState(null);

    // Fetching all theatres from the backend database
    useEffect(() => {
        axios.get("http://localhost:8080/theatre/all-theatres").then((res) => {
            setTheatres(res.data);
        }).catch((err) => {
            console.error("Error fetching theatres:", err.message);
        });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    // Filtering theatres based on search input 
    const filteredTheatres = theatres.filter(theatre =>
        theatre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handling theatre deletion
    const handleDelete = async (id) => {
        try {
            // Sending delete request to backend server
            await axios.delete(`http://localhost:8080/theatre/delete/${id}`);

            // Removing deleted theatre from the existing array
            setTheatres(theatres.filter(theatre => theatre._id !== id));

            setShowModal(false);
        } catch (error) {
            console.error("Error deleting theatre:", error.message);
        }
    };

    const handleShowModal = (theatre) => {
        setTheatreToDelete(theatre);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTheatreToDelete(null);
    };

    return (
        <div className="container bg">
            <h1 className="my-4 text-center">Theatres</h1>

            {/* Search bar for theatres */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search for theatres..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="list-group bg">

                {/* Link for adding new theatre */}
                <div className="list-group-item bg">
                    <div className="row">
                        <div className="offset-5 col-2 offset-md-6 col-md-1">
                            <Link to={"/dashboard/theatres/add"} className="col-md-1 link"> Add </Link>
                        </div>
                    </div>
                </div>
                {/* List of Theatres */}
                {filteredTheatres.map((theatre) => (
                    <div className="list-group-item bg" key={theatre._id}>
                        <div className="row">
                            <h5 className="mb-1 col-6 col-md-5">{theatre.name}</h5>
                            {/* <p className="mb-1 col-6 col-md-4">{theatre.address.city}</p> */}
                            <div className='col-6 offset-md-3 col-md-4 dash-btn-div'>
                            <Link to={`/theatre/${theatre._id}`} className="link"> Show </Link>
                            <Link to={`/dashboard/theatres/addShowTimes/${theatre._id}`} className="link"> Add Shows </Link>
                                <Link to={`/dashboard/theatres/edit/${theatre._id}`} className="link"> Edit </Link>
                                <button onClick={() => handleShowModal(theatre)} className="link btn-delete"> Delete </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Delete Confirmation */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body bg">
                                <p>Are you sure you want to delete the theatre "{theatreToDelete?.name}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(theatreToDelete._id)}>
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

export default AdminTheatrePage;
