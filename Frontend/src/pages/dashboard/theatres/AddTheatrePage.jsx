// import React, {useState} from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function AddTheatrePage() {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [message, setMessage] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);

//     const onSubmit = async (data) => {
//         window.scrollTo(0, 0);
//         try {
//             const response = await axios.post("http://localhost:8080/theatre/add", data);
//             // alert("Theatre added successfully!");
//             if (response.status === 200) {
//                 setMessage('Theatre added successfully!');
//                 setIsSuccess(true);
//                 reset(); // Reset the form
//             }
//         } catch (error) {
//             if (error.response) {
//                 setMessage(
//                     `Error: ${error.response.data.error || 'Failed to add theatre'}`
//                 );
//             } else {
//                 setMessage(`Error: ${error.message}`);
//             }
//             setIsSuccess(false);
//         }
//     };

//     return (
//         <div className="container">

//             {message && (
//                 <h2 className={isSuccess ? 'text-success text-center' : 'text-danger'}>{message}</h2>
//             )}

//             <h2>Add Theatre</h2>
//             <form onSubmit={handleSubmit(onSubmit)} noValidate>

//                 {/* Theatre Name */}
//                 <div className="mb-3" >
//                     <label htmlFor="name" className="form-label" >Theatre Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         {...register("name", { required: "Theatre name is required" })}
//                         placeholder="Enter movie title"
//                         className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                     />
//                     {errors.name && <p>{errors.name.message}</p>}
//                 </div>

//                 {/* Address */}
//                 <div className="mb-3" >
//                     <label htmlFor="address" className="form-label" >Address:</label>
//                     <input
//                         type="text"
//                         id="address"
//                         {...register("address", { required: "Address is required" })}
//                         placeholder="Enter movie title"
//                         className={`form-control ${errors.address ? 'is-invalid' : ''}`}
//                     />
//                     {errors.location && <p>{errors.address.message}</p>}
//                 </div>
                
//                 <button type="submit" className="btn btn-danger" >Add Theatre</button>
//             </form>
//         </div>
//     );
// }

// export default AddTheatrePage;


import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

function AddTheatrePage() {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "layout.categories" });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        window.scrollTo(0, 0);
        try {
            const response = await axios.post("http://localhost:8080/theatre/add", data);
            if (response.status === 200) {
                setMessage('Theatre added successfully!');
                setIsSuccess(true);
                reset(); // Reset form
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to add theatre');
            setIsSuccess(false);
        }
    };

    return (
        <div className="container">
            {message && (
                <h2 className={isSuccess ? 'text-success text-center' : 'text-danger'}>{message}</h2>
            )}

            <h2>Add Theatre</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Theatre Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Theatre Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Theatre name is required" })}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter theatre name"
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                        type="text"
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Enter address"
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>

                <h4>Theatre Layout</h4>

                {/* Total Rows */}
                <div className="mb-3">
                    <label htmlFor="totalRows" className="form-label">Total Rows:</label>
                    <input
                        type="number"
                        id="totalRows"
                        {...register("layout.totalRows", { required: "Total rows are required" })}
                        className={`form-control ${errors.layout?.totalRows ? 'is-invalid' : ''}`}
                    />
                    {errors.layout?.totalRows && <p className="text-danger">{errors.layout.totalRows.message}</p>}
                </div>

                {/* Seats Per Row */}
                <div className="mb-3">
                    <label htmlFor="seatsPerRow" className="form-label">Seats Per Row:</label>
                    <input
                        type="number"
                        id="seatsPerRow"
                        {...register("layout.seatsPerRow", { required: "Seats per row are required" })}
                        className={`form-control ${errors.layout?.seatsPerRow ? 'is-invalid' : ''}`}
                    />
                    {errors.layout?.seatsPerRow && <p className="text-danger">{errors.layout.seatsPerRow.message}</p>}
                </div>

                {/* Categories */}
                <h5>Seat Categories</h5>
                {fields.map((category, index) => (
                    <div key={category.id} className="mb-3 border p-2">
                        <label className="form-label">Category {index + 1}:</label>
                        <select {...register(`layout.categories.${index}.name`)} className="form-control">
                            <option value="STANDARD">STANDARD</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="VIP">VIP</option>
                        </select>

                        {/* Row Range */}
                        <div className="d-flex mt-2">
                            <input
                                type="number"
                                placeholder="Start Row"
                                {...register(`layout.categories.${index}.rowsRange.start`, { required: true })}
                                className="form-control me-2"
                            />
                            <input
                                type="number"
                                placeholder="End Row"
                                {...register(`layout.categories.${index}.rowsRange.end`, { required: true })}
                                className="form-control"
                            />
                        </div>

                        {/* Base Price */}
                        <input
                            type="number"
                            placeholder="Base Price"
                            {...register(`layout.categories.${index}.basePrice`, { required: true })}
                            className="form-control mt-2"
                        />

                        <button type="button" className="btn btn-danger mt-2" onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="btn btn-primary mb-3" onClick={() => append({})}>Add Category</button>

                {/* Aisles */}
                <h5>Aisles</h5>
                <div className="mb-3">
                    <label className="form-label">Rows:</label>
                    <input
                        type="text"
                        {...register("layout.aisles.rows")}
                        className="form-control"
                        placeholder="Enter row numbers separated by commas (e.g. 2,5,8)"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Columns:</label>
                    <input
                        type="text"
                        {...register("layout.aisles.columns")}
                        className="form-control"
                        placeholder="Enter column numbers separated by commas (e.g. 3,7,10)"
                    />
                </div>

                {/* Disabled Seats */}
                <h5>Disabled Seats</h5>
                <div className="mb-3">
                    <label className="form-label">Seat IDs (comma-separated):</label>
                    <input
                        type="text"
                        {...register("layout.disabledSeats")}
                        className="form-control"
                        placeholder="E.g. A1, B5, C3"
                    />
                </div>

                <button type="submit" className="btn btn-danger">Add Theatre</button>
            </form>
        </div>
    );
}

export default AddTheatrePage;
