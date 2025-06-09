import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EventPage() {

  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/event/${id}`).then((res) => {
      setEvent(res.data);

    }).catch((error) => {
      console.error("Error fetching movie data:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handlePayment = async () => {

    if (user.isLoggedIn === false) {
            alert("Please login/signup first!");
            navigate("/signup_login");
            return;
        }

    const res = await axios.post('/payment/create-order', {
      amount: event.price * ticketCount,
    });
    console.log(res.data)
    const options = {
      key: "rzp_test_QpTQbcYP2DIhAx",
      amount: res.data.amount,
      currency: "INR",
      name: "TicketVerse",
      description: "Event Ticket Booking",
      order_id: res.data.id,
      handler: async function (response) {
        // Send details to backend for verification + booking
        await axios.post(`/event/book/${id}`, {
          eventId: id,
          ticketCount,
          paymentId: response.razorpay_payment_id,
          email: user.email, // assume you have user context
        });
        window.location.reload();
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  if (loading) return <div>Loading...</div>;
  return (
    <div className="container movie-page mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <img src={event.posterUrl} alt={event.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h2 className="card-title mb-4">{event.name}</h2>
          <p className="card-text"><strong>Category:</strong> {event.category}</p>
          <p className="card-text"><strong>Description:</strong> {event.description}</p>
          <p className="card-text"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p className="card-text"><strong>Time:</strong> {event.time}</p>
          <p className="card-text"><strong>Venue:</strong> {event.venue.name}, {event.venue.address}</p>
          <p className="card-text"><strong>Organizer:</strong> {event.organizer}</p>
          <p className="card-text"><strong>Tickets Available:</strong> {event.ticketsAvailable}</p>
          <p className="card-text"><strong>Price:</strong> &#8377; {event.price}</p>

          {/* Tickets Available */}
          <div className="mb-3 col-md-4">
            <label htmlFor="tickets" className="form-label">Enter number of tickets</label>
            <input
              type="number"
              value={ticketCount}
              id="tickets"
              onChange={(e) => { setTicketCount(Number(e.target.value)) }}
              placeholder="Enter number of tickets"
              className={`form-control `}
            />

            <button type="submit" onClick={handlePayment} className="btn btn-danger mt-3">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;