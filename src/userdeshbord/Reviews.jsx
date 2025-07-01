// src/userdeshbord/Reviews.jsx
import React, { useEffect, useState } from "react";
import CenteredMessage from "./CenteredMessage";

const Reviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`/api/userreviews/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  if (loading) return <CenteredMessage message="Loading your reviews..." />;
  if (reviews.length === 0) return <CenteredMessage message="No reviews found." />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold">{review.movieTitle}</h3>
            <p className="text-yellow-500">⭐ {review.rating}/10</p>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <p className="text-sm text-gray-400 mt-1">
              Reviewed on {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
