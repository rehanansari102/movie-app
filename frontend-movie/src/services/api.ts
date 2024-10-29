// services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4001"; // Replace with your Nest.js backend URL

const createAxiosInstance = (authToken: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  });
};

// API for Login
export const login = async (credentials: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error for handling in the UI
  }
};

// API for Signup
export const signup = async (userDetails: any) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userDetails);
  return response.data;
};

// Fetch categories list
export const getCategories = async (authToken : string) => {
  const response = await createAxiosInstance(authToken).get(`/categories`);
  return response.data;
};

export const getMovies = async (authToken : string) => {
    const response = await createAxiosInstance(authToken).get(`/movies`);
    return response.data;
  };

  
// Fetch movies by category
export const getMoviesByCategory = async (categoryId, authToken) => {
  const response = await createAxiosInstance(authToken).get(
    `/movies/category/${categoryId}`
  );
  return response.data;
};

// Search Movies
export const searchMovies = async (query, authToken) => {
  const response = await createAxiosInstance(authToken).get(`/movies/search`, {
    params: { q: query },
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId, profileData, authToken) => {
  const response = await createAxiosInstance(authToken).put(
    `/users/${userId}`,
    profileData
  );
  return response.data;
};


export const getUserProfile = async (authToken) => {
    const response = await createAxiosInstance(authToken).get(
      `/users/me`,
    );
    return response.data;
  };



// Rate a movie
export const rateMovie = async (movieId, rating, authToken) => {
  const response = await createAxiosInstance(authToken).post(
    `/movies/${movieId}/rate`,
    { rating }
  );
  return response.data;
};

// Fetch recommended movies
export const getRecommendedMovies = async (userId, authToken) => {
  const response = await createAxiosInstance(authToken).get(
    `/movies/recommended/${userId}`
  );
  return response.data;
};
