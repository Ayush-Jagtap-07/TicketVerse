import React, { useState } from 'react';
import axios from "../../../api/axios";
import { useForm } from 'react-hook-form';

function AddEventPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        window.scrollTo(0, 0);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('organizer', data.organizer);
        formData.append('ticketsAvailable', data.ticketsAvailable);
        formData.append('price', data.price);
        formData.append('poster', data.poster[0]);

        // Manually flatten the nested venue object
        formData.append('venueName', data.venue.name);
        formData.append('venueAddress', data.venue.address);

        try {
            const response = await axios.post(
                '/event/add',
                formData
            );

            if (response.status === 200) {
                setMessage('Event added successfully!');
                setIsSuccess(true);
                reset(); // Reset the form
            }
        } catch (error) {
            if (error.response) {
                setMessage(
                    `Error: ${error.response.data.error || 'Failed to add event'}`
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
            <h2 className="mb-3">Add New Event</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' noValidate>
                {/* Event Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Event name is required' })}
                        placeholder="Enter event name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                </div>

                {/* Event Poster */}
                <div className="mb-3">
                    <label htmlFor="poster" className="form-label">Poster</label>
                    <input
                        type="file"
                        id="poster"
                        {...register('poster', { required: 'Poster is required' })}
                        placeholder="Upload event poster"
                        className={`form-control ${errors.poster ? 'is-invalid' : ''}`}
                    />
                    {errors.poster && (
                        <div className="invalid-feedback">{errors.poster.message}</div>
                    )}
                </div>

                {/* Event Type */}
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
                        type="time"
                        id="time"
                        {...register('time', { required: 'Time is required' })}
                        // placeholder="Enter event time (Ex. 10:00 AM, 01:30 PM)"
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
    );
}

export default AddEventPage;
