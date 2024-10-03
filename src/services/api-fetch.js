import { BASE_URI } from "../cofig";

export const loginUser = async (email, password) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(`${BASE_URI}/login`, options);

  if (!response.ok) {
    const errData = await response.json();
    console.error("Error details:", errData);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchUserProfile = async (token) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(`${BASE_URI}/profile`, options);
  
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  
  return response.json();
};

export const createUser = async (userData) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${BASE_URI}/signup`, options);

    if (!response.ok) {
      const errData = await response.json();
      console.log("Error data:", errData); 
      throw new Error(errData.message || "Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during createUser:", error);
    throw error;
  }
};
