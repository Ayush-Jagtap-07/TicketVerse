import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import EntityCard from './EntityCard';
import axios from '../../api/axios';



function AdminDashboard() {

    const [count, setCount] = useState({});
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/dashboard');
                setCount(response.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        }
        fetchData();
    },[]);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/dashboard").then((res) => {
    //         setCount(res.data);
    //     })
    // }, [])

    const managementEntities = [
        {
            title: 'Users',
            totalEntries: count.userCount,
            rating: '9.0',
            link: '/dashboard/users'
        },
        {
            title: 'Movies',
            totalEntries: count.movieCount,
            rating: '9.0',
            link: '/dashboard/movies'
        },
        {
            title: 'Events',
            totalEntries: count.eventCount,
            rating: '9.0',
            link: '/dashboard/events'
        },
        {
            title: 'Theatres',
            totalEntries: count.theatreCount,
            rating: '9.0',
            link: '/dashboard/theatres'
        },
        {
            title: 'Bookings',
            totalEntries: 25,
            rating: '9.0',
            link: '/dashboard/bookings'
        }
    ];

    if (location.pathname.includes("movies") || location.pathname.includes("events") || location.pathname.includes("theatres")) {
        return (
            <div className='container' >
                <Link to={'/dashboard'} className="link text-center" ><h1 className="mt-5 mb-4" >Admin Dashboard</h1></Link>
                <Outlet />
            </div>
        );
    } else {
        return (
            <div className='container' >
                <h1 className="text-center mt-5 mb-4">Admin Dashboard</h1>
                <div className="row mt-5">
                    {managementEntities.map((entity, index) => (
                        <EntityCard entity={entity} key={index} />
                    ))}
                </div>
            </div>
        );
    }
}


export default AdminDashboard;