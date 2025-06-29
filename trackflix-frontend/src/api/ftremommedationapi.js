const API_URL = "http://localhost:5000/api/ftrecommendations";

export const fetchFTRecommendations = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch ft recommendations");
  return res.json();
};

export const addFTRecommendation = async (recommendation) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recommendation),
  });
  if (!res.ok) throw new Error("Failed to add ft recommendation");
};

export const updateFTRecommendation = async (id, recommendation) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recommendation),
  });
  if (!res.ok) throw new Error("Failed to update ft recommendation");
};

export const deleteFTRecommendation = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete ft recommendation");
};
