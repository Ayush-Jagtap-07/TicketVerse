import React, { useState } from 'react';
import axios from '../../api/axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onsubmit = async (data) => {
        try {
            const response = await axios.post(
                '/login',
                data,
                { withCredentials: true }
            );

            if (response.status === 200) {
                // Store the access token in a normal cookie (expires in 1 hour as an example)
                console.log(response.data);
                const { user } = useAuth();
                console.log(user);
                reset(); // Reset the form
                navigate('/home');

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

