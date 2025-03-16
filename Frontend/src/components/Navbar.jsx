// import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user } = useAuth();
    // console.log(user);

    const handleclick = () => {
        axiosInstance.post('logout');
    }

    return (
        <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" > <img src="/public/images/logo.png" alt="Bootstrap" width="60" height="50" /> </Link>
                <Link className="navbar-brand" to="/">TicketVerse</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ms-auto">
                        {user?.isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleclick} to="/login">Logout</button>
                                </li>
                                {user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                    </li>
                                )}
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup_login">Signup/Login</Link>
                            </li>
                        )}


                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;