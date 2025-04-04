import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function LoginForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onsubmit = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                data,
                { withCredentials: true }
            );

            if (response.status === 200) {
                // Store the access token in a normal cookie (expires in 1 hour as an example)
                console.log(response.data);
                reset(); // Reset the form
                <Navigate to='/' />

            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.log(`Error: ${error.response.data.error || 'Failed to login'}`)

        }
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className='row' >
                <div className=' offset-md-3 col-md-6' >
                    {/* Username */}
                    <div className='mb-3' >
                        <label htmlFor='Name' className="form-label" >Name</label>
                        <input type="text"
                            placeholder="Enter your name"
                            {...register('username', { required: 'Name is required' })}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username.message}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className='mb-3' >
                        <label htmlFor='password' className="form-label" >Password</label>
                        <input type="password" placeholder="Enter password"
                            {...register('password', { required: 'password is required' })}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                        )}
                    </div>

                    <button type="submit" className='btn btn-danger' >Log In</button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;

