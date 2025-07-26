import React, { useEffect, useState } from "react";

export default function BackendLoader({ children }) {
  const [loading, setLoading] = useState(true);

  async function checkBackend() {
    try {
     const res = await fetch(import.meta.env.VITE_API_BASE_URL);
      if (!res.ok) throw new Error("Backend not ready");
      setLoading(false);
    } catch {
      setLoading(true);
    }
  }

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Loading backend... please wait</h2>
      </div>
    );
  }

  return children;
}
