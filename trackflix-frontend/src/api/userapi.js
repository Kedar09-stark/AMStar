const API_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => { 
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};
