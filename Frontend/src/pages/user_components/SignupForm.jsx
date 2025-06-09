import React, { useState } from 'react';
import axios from '../../api/axios';
import { useForm } from 'react-hook-form';

function SignUpForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onsubmit = async (data) => {
        try {
            const response = await axios.post(
                '/signup',
                data,
                { withCredentials: true } 
            );

            if (response.status === 200) {
                console.log(response.data);
                reset(); // Reset the form
            }else {
                console.log(response.status);
            }
        } catch (error) {
            console.log(`Error: ${error.response.data.error || 'Failed to signup'}`)

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

                    {/* Email */}
                    <div className='mb-3' >
                        <label htmlFor='email' className="form-label" >Email</label>
                        <input type="email" placeholder="Enter your email"
                            {...register('email', { required: 'Email is required' })}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
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

                    {/* Phone number */}
                    <div className='mb-3' >
                        <label htmlFor='contactNumber' className="form-label" >Contact Number</label>
                        <input type="text"
                            placeholder="Enter your Contact Number"
                            {...register('contactNumber', { required: 'Contact Number is required' })}
                            className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`} />
                        {errors.contactNumber && (
                            <div className="invalid-feedback">{errors.contactNumber.message}</div>
                        )}
                    </div>

                    <button type="submit" className='btn btn-danger' >Sign Up</button>

                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
