import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <div className='text-center mt-5'>
            <h1>Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <Link to="/">Go to Homepage</Link> {/* Redirect to a permitted page */}
        </div>
    );
}

export default Unauthorized;

