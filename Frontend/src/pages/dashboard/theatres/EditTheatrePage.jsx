import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';

function EditTheatrePage() {
    const { id } = useParams(); // Get theatre ID from the URL
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchTheatreData = async () => {
            try {
                const response = await axios.get(`/theatre/${id}`);
                const theatreData = response.data;

                reset({
                    name: theatreData.name,
                    address: theatreData.address,
                    totalRows: theatreData.layout.totalRows,
                    seatsPerRow: theatreData.layout.seatsPerRow,
                    categories: theatreData.layout.categories,
                    aislesRows: theatreData.layout.aisles.rows.join(','),
                    aislesColumns: theatreData.layout.aisles.columns.join(','),
                    disabledSeats: theatreData.layout.disabledSeats.join(',')
                });
            } catch (error) {
                setMessage('Failed to fetch theatre details.');
                setIsSuccess(false);
            }
        };
        fetchTheatreData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        window.scrollTo(0, 0);

        try {
            const formattedData = {
                name: data.name,
                address: data.address,
                layout: {
                    totalRows: Number(data.totalRows),
                    seatsPerRow: Number(data.seatsPerRow),
                    categories: data.categories,
                    aisles: {
                        rows: data.aislesRows.split(',').map(Number),
                        columns: data.aislesColumns.split(',').map(Number)
                    },
                    disabledSeats: data.disabledSeats.split(',')
                }
            };

            const response = await axios.put(`/theatre/edit/${id}`, formattedData);
            if (response.status === 200) {
                setMessage('Theatre updated successfully!');
                setIsSuccess(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to update theatre');
            setIsSuccess(false);
        }
    };

    return (
        <div className="mt-4 container">
            {message && <h2 className={isSuccess ? 'text-success text-center' : 'text-danger'}>{message}</h2>}
            <h2 className="mb-3">Edit Theatre</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                    <label className="form-label">Theatre Name</label>
                    <input type="text" {...register('name', { required: 'Theatre name is required' })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" {...register('address', { required: 'Address is required' })} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Total Rows</label>
                    <input type="number" {...register('totalRows', { required: 'Total rows are required' })} className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Seats Per Row</label>
                    <input type="number" {...register('seatsPerRow', { required: 'Seats per row are required' })} className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Aisle Rows (comma-separated)</label>
                    <input type="text" {...register('aislesRows')} className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Aisle Columns (comma-separated)</label>
                    <input type="text" {...register('aislesColumns')} className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Disabled Seats (comma-separated)</label>
                    <input type="text" {...register('disabledSeats')} className="form-control" />
                </div>
                
                <button type="submit" className="btn btn-danger">Update Theatre</button>
            </form>
        </div>
    );
}

export default EditTheatrePage;
