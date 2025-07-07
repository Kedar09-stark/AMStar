import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchInterests = () => {
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get("https://fourloopers-9.onrender.com/api/interests");
        setInterests(response.data);
      } catch (err) {
        console.error("Error fetching interests:", err);
        setError(err);
      }
    };

    fetchInterests();
  }, []);

  return { interests, error };
};
