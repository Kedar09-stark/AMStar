import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally show a loading screen while Firebase auth initializes
    return <div className="flex-grow flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Pass user or loggedIn boolean to Header */}
      <Header isLoggedIn={!!user} user={user} />

      <main className="flex-grow">
        {/* Pass user info and loading state to nested routes */}
        <Outlet context={{ user }} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
