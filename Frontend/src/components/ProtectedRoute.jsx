import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRoles }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    
    // If the user is not logged in, redirect to the login page
    if (!user?.isLoggedIn) {
        console.log("Redirecting to /signup_login...");
        return <Navigate to="/signup_login" />;
    }

    // If the user's role does not match the required role, redirect to the unauthorized page
    if (requiredRoles && !requiredRoles.includes(user.role)) {
        console.log("Redirecting to /unauthorized...");
        return <Navigate to="/unauthorized" />;
    }

    // If the user is logged in and has the required role, render the children
    return children;
}


export default ProtectedRoute;
