import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'

import './App.css'

import MoviePage from './pages/MoviePage';
import EventPage from './pages/EventPage';
import TheatrePage from './pages/TheatrePage';
import ScrollToTop from './components/ScrollToTop';

import AdminDashboard from './pages/dashboard/AdminDashboard';

import AdminMoviePage from './pages/dashboard/movies/AdminMoviePage';
import AddMoviePage from './pages/dashboard/movies/AddMoviePage';
import EditMoviePage from './pages/dashboard/movies/EditMoviePage';

import AdminEventPage from './pages/dashboard/events/AdminEventPage';
import AddEventPage from './pages/dashboard/events/AddEventPage';
import EditEventPage from './pages/dashboard/events/EditEventPage';

import AdminTheatrePage from './pages/dashboard/theatres/AdminTheatrePage';
import AddTheatrePage from './pages/dashboard/theatres/AddTheatrePage';
import EditTheatrePage from './pages/dashboard/theatres/EditTheatrePage';
import AddShowTimesPage from './pages/dashboard/theatres/AddShowTimesPage';

import AuthContainer from './pages/user_components/AuthContainer';

import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import SeatMap from './pages/SeatMap';
import ShowTimePage from './pages/ShowTimePage';


// import { useAuth } from './context/AuthContext';
// import createAxiosInstance from './api/axios';

function App() {

  return (
    <>
    <AuthProvider>
      {/* Scroll to top component to handle scrolling behavior on route changes */}
      <ScrollToTop />
        <Navbar />

        <div className='main-div'>

          {/* Defining all the Routes for different pages */}
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/seatmap" element={<SeatMap />} />

            {/* <Route element={<ProtectedRoute requiredRoles={["admin"]} />}> */}


              {/* Admin Dashboard route, nested routes for Movies, Events, and Theatres */}
              <Route path='/dashboard/' element={<ProtectedRoute requiredRoles={["admin"]} >{<AdminDashboard />}</ProtectedRoute>}>
                {/* Movies Routes */}
                <Route path="movies" element={<AdminMoviePage />} />
                <Route path="movies/add" element={<AddMoviePage />} />
                <Route path="movies/edit/:id" element={<EditMoviePage />} />

                {/* Events Routes */}
                <Route path="events" element={<AdminEventPage />} />
                <Route path="events/add" element={<AddEventPage />} />
                <Route path="events/edit/:id" element={<EditEventPage />} />

                {/* Theatres Routes */}
                <Route path="theatres" element={<AdminTheatrePage />} />
                <Route path="theatres/add" element={<AddTheatrePage />} />
                <Route path="theatres/edit/:id" element={<EditTheatrePage />} />
                <Route path="theatres/addShowTimes/:id" element={<AddShowTimesPage />} />
              </Route>


            {/* </Route> */}

            {/* Static pages routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

            <Route path='/signup_login' element={<AuthContainer />} />



            {/* Dynamic routes for Movie and Event pages, using their IDs */}
            
            <Route path='/event/:id' element={<EventPage />} />
            <Route path='/movie/:id' element={<MoviePage />} />
            <Route path='/theatre/:id' element={<TheatrePage />} />
            <Route path='/showtime/:id' element={<ShowTimePage />} />

          </Routes>

        </div>

        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
