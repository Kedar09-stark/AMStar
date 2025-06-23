import React, { useEffect, useState } from "react";

function LiveShow() {
  const [shows, setShows] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/liveshows")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("✅ Live shows data fetched:", data);
      setShows(data);
    })
    .catch((err) => {
      console.error("❌ Error fetching live shows:", err.message);
      alert("Failed to load live shows. See console.");
    });
}, []);


  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 md:px-10">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8 text-center">Live Shows</h1>

      {shows.length === 0 ? (
        <p className="text-lg text-center">No live show is currently streaming. Check back soon!</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg transition hover:scale-105"
            >
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-yellow-300 mb-2">{show.title}</h2>
                <p className="text-sm text-gray-400 mb-1">Hosted by: {show.host}</p>
                <p className="text-sm text-gray-500">Starts at: {show.startTime}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveShow;

