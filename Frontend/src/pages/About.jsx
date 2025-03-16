// src/pages/About.js
import React from 'react';

function About() {
    return (
        <div className="container mt-4 mb-5">

            <div className="text-center mb-4">
                <img src="images/logo.png" alt="Company Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
                <h1 className="display-1 mt-3"><strong>TicketVerse</strong></h1> 
            </div>

            <h1>About Us</h1>
            <p>
                Welcome to our ticket booking application! We strive to provide the best service for booking tickets for various events, including concerts, movies, and sports. Our mission is to make the ticket booking process as seamless and enjoyable as possible.
            </p>

            <h1>Meet Our Team</h1>
            <p>
                Our team is composed of passionate individuals who are dedicated to providing the best ticket booking experience. From frontend to backend, each member plays a vital role in our success.
            </p>
            <ul>
                <li><strong>Ayush Jagtap</strong></li>
                <li><strong>Shripad Jadhav</strong></li>
                <li><strong>Krishna Jewlikar</strong></li>
            </ul>


            <h1>Our Mission</h1>
            <p>
                Our mission is to connect people with unforgettable experiences. We believe that every event has the potential to create lasting memories, and we are here to facilitate that journey. We aim to provide a user-friendly platform that allows you to find and book tickets effortlessly.
            </p>

            <h1>Our Values</h1>
            <ul>
                <li><strong>Customer Satisfaction:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
                <li><strong>Integrity:</strong> We operate with transparency and honesty in all our dealings.</li>
                <li><strong>Innovation:</strong> We continuously seek to improve our services and embrace new technologies.</li>
                <li><strong>Community:</strong> We believe in giving back to the community and supporting local events.</li>
            </ul>

            <h1>Get in Touch</h1>
            <p>
                If you have any questions or feedback, feel free to reach out to us through our <a href="/contact">Contact Page</a>.
            </p>
        </div>
    );
};

export default About;