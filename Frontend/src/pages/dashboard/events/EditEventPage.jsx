import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function EditEventPage() {

    const { id } = useParams(); // Get event ID from the URL
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Fetch existing event data
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/event/${id}`);
                const eventData = response.data;

                // Format the release date
                const formattedDate = new Date(eventData.date).toISOString().split('T')[0];

                // Set default values in the form
                reset({
                    name: eventData.name,
                    category: eventData.category,
                    description: eventData.description,
                    date: formattedDate,
                    time: eventData.time,
                    venue: eventData.venue,
                    organizer: eventData.organizer,
                    ticketsAvailable: eventData.ticketsAvailable,
                    price: eventData.price,
                    posterUrl: eventData.posterUrl
                });
            } catch (error) {
                setMessage('Failed to fetch movie details.');
                setIsSuccess(false);
            }
        };

        fetchMovieData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        window.scrollTo(0, 0);

        try {
            const response = await axios.put(
                `http://localhost:8080/event/edit/${id}`,
                data
            );

            if (response.status === 200) {
                setMessage('Event updated successfully!');
                setIsSuccess(true);
            }
        } catch (error) {
            if (error.response) {
                setMessage(
                    `Error: ${error.response.data.error || 'Failed to update movie'}`
                );
            } else {
                setMessage(`Error: ${error.message}`);
            }
            setIsSuccess(false);
        }
    };

    return (
        <div className="container">
            {message && (
                <h2 className={isSuccess ? 'text-success text-center' : 'text-danger'}>{message}</h2>
            )}
            <h2 className="mb-3">Edit Event</h2>
            <div className='row'>
                <div className='col' >
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Event Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Event Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: 'Event name is required' })}
                                placeholder="Enter event name"
                                className={`form-control ${errors.eventName ? 'is-invalid' : ''}`}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>

                        {/* Event Poster URL */}
                        <div className="mb-3">
                            <label htmlFor="posterUrl" className="form-label">Poster URL</label>
                            <input
                                type="text"
                                id="posterUrl"
                                {...register('posterUrl', { required: 'Poster URL is required' })}
                                placeholder="Enter event poster URL"
                                className={`form-control ${errors.posterUrl ? 'is-invalid' : ''}`}
                            />
                            {errors.posterUrl && (
                                <div className="invalid-feedback">{errors.posterUrl.message}</div>
                            )}
                        </div>

                        {/* Event Category */}
                        <div className="mb-2">Event Category</div>
                        <select {...register('category', { required: 'Event type is required' })} className="form-select mb-3">
                            <option value="">Select an event category</option>
                            {['Music', 'Technology', 'Workshop', 'Exhibition', 'Sport', 'Business'].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <div className="text-danger">{errors.category.message}</div>
                        )}

                        {/* Description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                rows="3"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                placeholder="Enter event description"
                            ></textarea>
                            {errors.description && (
                                <div className="invalid-feedback">{errors.description.message}</div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                id="date"
                                {...register('date', { required: 'Date is required' })}
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                            />
                            {errors.date && (
                                <div className="invalid-feedback">{errors.date.message}</div>
                            )}
                        </div>

                        {/* Time */}
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">Time</label>
                            <input
                                type="text"
                                id="time"
                                {...register('time', { required: 'Time is required' })}
                                className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                            />
                            {errors.time && (
                                <div className="invalid-feedback">{errors.time.message}</div>
                            )}
                        </div>

                        {/* Venue */}
                        <div className="mb-3">
                            <h5 className="mb-3">Venue Details</h5>

                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="venueName" className="form-label">Venue Name</label>
                                <input
                                    type="text"
                                    id="venueName"
                                    {...register('venue.name', { required: 'Venue name is required' })}
                                    placeholder="Enter venue name"
                                    className={`form-control ${errors.venue?.name ? 'is-invalid' : ''}`}
                                />
                                {errors.venue?.name && (
                                    <div className="invalid-feedback">{errors.venue.name.message}</div>
                                )}
                            </div>

                            {/* Address */}
                            <div className="mb-3">
                                <label htmlFor="venueAddress" className="form-label">Address</label>
                                <input
                                    type="text"
                                    id="venueAddress"
                                    {...register('venue.address', { required: 'Address is required' })}
                                    placeholder="Enter venue address"
                                    className={`form-control ${errors.venue?.address ? 'is-invalid' : ''}`}
                                />
                                {errors.venue?.address && (
                                    <div className="invalid-feedback">{errors.venue.address.message}</div>
                                )}
                            </div>

                        </div>

                        {/* Organizer */}
                        <div className="mb-3">
                            <label htmlFor="organizer" className="form-label">Organizer</label>
                            <input
                                type="text"
                                id="organizer"
                                {...register('organizer', { required: 'Organizer is required' })}
                                placeholder="Enter organizer details"
                                className={`form-control ${errors.organizer ? 'is-invalid' : ''}`}
                            />
                            {errors.organizer && (
                                <div className="invalid-feedback">{errors.organizer.message}</div>
                            )}
                        </div>

                        {/* Tickets Available */}
                        <div className="mb-3">
                            <label htmlFor="ticketsAvailable" className="form-label">Tickets Available</label>
                            <input
                                type="number"
                                id="ticketsAvailable"
                                {...register('ticketsAvailable', { required: 'Tickets Available is required' })}
                                placeholder="Enter number of tickets available"
                                className={`form-control ${errors.ticketsAvailable ? 'is-invalid' : ''}`}
                            />
                            {errors.ticketsAvailable && (
                                <div className="invalid-feedback">{errors.ticketsAvailable.message}</div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                id="price"
                                {...register('price', { required: 'Price is required' })}
                                placeholder="Enter price of the ticket"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            />
                            {errors.price && (
                                <div className="invalid-feedback">{errors.price.message}</div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-danger">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditEventPage;