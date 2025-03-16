import React from 'react';

function Contact() {
    return (
        <div className="container mt-4">
            <h1>Contact Us</h1>
            <p>If you have any questions or need assistance, feel free to reach out to us!</p>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control inp-bg" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control inp-bg" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control inp-bg" id="message" rows="3" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default Contact;