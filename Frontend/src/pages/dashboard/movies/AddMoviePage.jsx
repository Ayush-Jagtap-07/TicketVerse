import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';


function AddMoviePage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        window.scrollTo(0, 0);

        try {
            const response = await axios.post(
                'http://localhost:8080/movie/add',
                data
            );

            if (response.status === 200) {
                setMessage('Movie added successfully!');
                setIsSuccess(true);
                reset(); // Reset the form
            }
        } catch (error) {
            if (error.response) {
                setMessage(
                    `Error: ${error.response.data.error || 'Failed to add movie'}`
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
            <h2 className="mb-3">Add New Movie</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        placeholder="Enter movie title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    />
                    {errors.title && (
                        <div className="invalid-feedback">{errors.title.message}</div>
                    )}
                </div>

                {/* Poster URL */}
                <div className="mb-3">
                    <label htmlFor="posterUrl" className="form-label">Poster URL</label>
                    <input
                        type="text"
                        id="posterUrl"
                        {...register('posterUrl', { required: 'Poster URL is required' })}
                        placeholder="Enter movie poster URL"
                        className={`form-control ${errors.posterUrl ? 'is-invalid' : ''}`}
                    />
                    {errors.posterUrl && (
                        <div className="invalid-feedback">{errors.posterUrl.message}</div>
                    )}
                </div>

                {/* Genre */}
                <div className="mb-2">Enter Movie Genre</div>
                <select {...register('genre', { required: 'Genre is required' })} className="form-select mb-3" >
                    <option value="">Select a genre</option>
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'].map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                {errors.genre && (
                    <div className="text-danger">{errors.genre.message}</div>
                )}

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        rows="3"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Enter movie description"
                    ></textarea>
                    {errors.description && (
                        <div className="invalid-feedback">{errors.description.message}</div>
                    )}
                </div>

                {/* Release Date */}
                <div className="mb-3">
                    <label htmlFor="releaseDate" className="form-label">Release Date</label>
                    <input
                        type="date"
                        id="releaseDate"
                        {...register('releaseDate', { required: 'Release Date is required' })}
                        className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}
                    />
                    {errors.releaseDate && (
                        <div className="invalid-feedback">{errors.releaseDate.message}</div>
                    )}
                </div>

                {/* Duration */}
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (in minutes)</label>
                    <input
                        type="number"
                        id="duration"
                        {...register('duration', { required: 'Duration is required' })}
                        placeholder="Enter movie duration"
                        className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                    />
                    {errors.duration && (
                        <div className="invalid-feedback">{errors.duration.message}</div>
                    )}
                </div>

                {/* Language */}
                <div className="mb-3">
                    <label htmlFor="language" className="form-label">Language</label>
                    <input
                        type="text"
                        id="language"
                        {...register('language', { required: 'Language is required' })}
                        placeholder="Enter movie language"
                        className={`form-control ${errors.language ? 'is-invalid' : ''}`}
                    />
                    {errors.language && (
                        <div className="invalid-feedback">{errors.language.message}</div>
                    )}
                </div>

                {/* Cast */}
                <div className="mb-3">
                    <label htmlFor="cast" className="form-label">Cast</label>
                    <input
                        type="text"
                        id="cast"
                        {...register('cast', { required: 'Cast is required' })}
                        placeholder="Enter movie cast (e.g., name, name)"
                        className={`form-control ${errors.cast ? 'is-invalid' : ''}`}
                    />
                    {errors.cast && (
                        <div className="invalid-feedback">{errors.cast.message}</div>
                    )}
                </div>

                {/* Director */}
                <div className="mb-3">
                    <label htmlFor="director" className="form-label">Director</label>
                    <input
                        type="text"
                        id="director"
                        {...register('director', { required: 'Director is required' })}
                        placeholder="Enter movie director"
                        className={`form-control ${errors.director ? 'is-invalid' : ''}`}
                    />
                    {errors.director && (
                        <div className="invalid-feedback">{errors.director.message}</div>
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

export default AddMoviePage;
