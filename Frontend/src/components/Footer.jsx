import React from 'react';

function Footer() {
    return (
        <footer className="footer bg-dark text-white text-center py-4 mt-4">
            <div className="container">
                <p className="mb-0">© {new Date().getFullYear()} TicketVerse. All rights reserved.</p>
                <ul className="list-inline mt-2">
                    <li className="list-inline-item">
                        <a href="/about" className="text-white">About Us</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/contact" className="text-white">Contact</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/privacy" className="text-white">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms" className="text-white">Terms of Service</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;