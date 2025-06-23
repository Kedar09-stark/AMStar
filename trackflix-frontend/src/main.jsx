import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages and Components
import App from './App.jsx';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails'; // Movie details component
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import LiveShow from './pages/LiveShow';
import NewToMovies from './components/FooterExtra/NewToMovies';

// Admin and User pages
import AdminPage from './pages/AdminPage';
import UserDashboard from './pages/UserDashboard';

// Footer Extra Pages
import About from './components/FooterExtra/About';
import Contact from './components/FooterExtra/Contact';
import Privacy from './components/FooterExtra/Privacy';
import Terms from './components/FooterExtra/Terms';

// FT More Recommendations Page
import FTMoreRecommendations from './RecommendationPage/FTMoreRecommendations';
import MostPCMoreRecommendations from './RecommendationPage/MostPCMoreRecommendations.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/movies', element: <Movies /> },

      // Updated route to plural "movies"
      { path: '/movies/:id', element: <MovieDetails /> },

      { path: '/search', element: <Search /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/liveshow', element: <LiveShow /> },
      { path: '/new-to-movies', element: <NewToMovies /> },

      // Recommendations
      { path: '/recommendations', element: <FTMoreRecommendations /> },
      { path: '/recommendations2', element: <MostPCMoreRecommendations /> },

      // Admin and User dashboard routes
      { path: '/admin', element: <AdminPage /> },
      { path: '/dashboard', element: <UserDashboard /> },

      // Footer Extra Pages
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },

      // 404 fallback (must be last)
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
