import React, { useEffect, useState } from 'react';
import axios from "../../../api/axios";

function AdminUserPage() {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Fetch all users
    useEffect(() => {
        axios.get("/all-users")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/delete/${id}`);
            setUsers(users.filter(user => user._id !== id));
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    };

    return (
        <div className="container bg">
            <h1 className="my-4 text-center">Users</h1>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control inp-bg"
                    placeholder="Search for users..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="list-group bg">
                {filteredUsers.map(user => (
                    <div className="list-group-item bg" key={user._id}>
                        <div className="row align-items-center">
                            <h5 className="col-md-4 mb-1">{user.username}</h5>
                            <p className="col-md-4 mb-1">{user.email}</p>
                            <div className='col-md-4 text-end'>
                                <button className="link btn-delete" onClick={() => { setUserToDelete(user); setShowModal(true); }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete confirmation modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body bg">
                                <p>Are you sure you want to delete user "{userToDelete?.username}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(userToDelete._id)}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUserPage;
