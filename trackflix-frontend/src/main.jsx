import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages and Components
import App from "./App.jsx";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import LiveDetails from "./pages/LiveDetails";
import Search from "./pages/Search";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import LiveShow from "./pages/LiveShow";
import NewToMovies from "./components/FooterExtra/NewToMovies";
import FTMoreRecommendations from "./RecommendationPage/FTMoreRecommendations";
import MostPCMoreRecommendations from "./RecommendationPage/MostPCMoreRecommendations.jsx";
import AdminPage from "./pages/AdminPage";
import UserDashboard from "./pages/UserDashboard";
import About from "./components/FooterExtra/About";
import Contact from "./components/FooterExtra/Contact";
import Privacy from "./components/FooterExtra/Privacy";
import Terms from "./components/FooterExtra/Terms";
import MeetTeam from "./pages/MeetTeam.jsx";
import NotFound from "./pages/NotFound";
import ProSubscriptionPage from "./ProVersion/ProSubscriptionPage.jsx";
import TheaterPage from "./ProVersion/TheaterPage.jsx";

// ----------- Protected route wrappers ------------

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

// Simplified ProUserRoute to protect pro-only routes
const ProUserRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // Direct check for pro status on user object
  return user.pro ? <Outlet /> : <Navigate to="/subscription" />;
};

// ------------ Router setup ------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/TvshowDetails/:id", element: <LiveDetails /> },
      { path: "/search", element: <Search /> },
      { path: "/login", element: <LogIn /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/Tvshow", element: <LiveShow /> },
      { path: "/new-to-movies", element: <NewToMovies /> },

      { path: "/recommendations", element: <FTMoreRecommendations /> },
      { path: "/recommendations2", element: <MostPCMoreRecommendations /> },

      // Nested routes under dashboard
      {
        element: <PrivateRoute />,
        children: [{ path: "/dashboard/*", element: <UserDashboard /> }],
      },

      {
        element: <AdminRoute />,
        children: [{ path: "/admin", element: <AdminPage /> }],
      },

      // Pro Subscription page - open to all logged-in users
      { path: "/subscription", element: <ProSubscriptionPage /> },

      // Protected Theater page - only for logged-in Pro users
      {
        element: <ProUserRoute />,
        children: [{ path: "/theater", element: <TheaterPage /> }],
      },

      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/teams", element: <MeetTeam /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

// ------------- Render -------------------

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
