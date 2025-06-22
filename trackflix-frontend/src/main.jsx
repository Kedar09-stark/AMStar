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
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import LiveShow from './pages/LiveShow';
import NewToMovies from './components/FooterExtra/NewToMovies';

// ✅ Footer Extra Pages
import About from './components/FooterExtra/About';
import Contact from './components/FooterExtra/Contact';
import Privacy from './components/FooterExtra/Privacy';
import Terms from './components/FooterExtra/Terms';

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/search', element: <Search /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/liveshow', element: <LiveShow /> },
      { path: '/new-to-movies', element: <NewToMovies /> },

      // ✅ FooterExtra Pages
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },

      // 404 fallback
      { path: '*', element: <NotFound /> },
    ],
  },
]);

// Mount the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
