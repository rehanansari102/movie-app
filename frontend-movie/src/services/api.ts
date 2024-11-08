import axios from "axios";

const API_BASE_URL = "http://localhost:4001"; // Replace with your Nest.js backend URL
const TOKEN_KEY = "authToken"; // Key to store/retrieve token from local storage

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(TOKEN_KEY);
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    // Successful response
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized error here
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Please log in.");

      // Optionally, you can also redirect to the login page or show an alert
      window.location.href = "/"; // Example redirect to login page
    }

    // You can handle other errors (500, 404, etc.) here
    return Promise.reject(error); // Ensure the error is passed to the component that called the API
  }
);
// API for Login
export const login = async (credentials: any) => {
  try {
    const response = await api.post(`/auth/login`, credentials); // Use 'api' here instead of axios directly
    localStorage.setItem(TOKEN_KEY, response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error for handling in the UI
  }
};

// API for Signup
export const signup = async (userDetails: any) => {
  const response = await api.post(`/auth/register`, userDetails); // Use 'api' here instead of axios directly
  localStorage.setItem(TOKEN_KEY, response?.data?.data?.accessToken); // Store token in local storage
  return response.data;
};

// Fetch categories list
export const getCategories = async () => {
  const response = await api.get(`/categories`);
  return response.data;
};

export const getMovies = async () => {
  const response = await api.get(`/movies`);
  return response.data;
};

// Fetch movies by category
export const getMoviesByCategory = async (categoryId: string) => {
  const response = await api.get(`/movies/category/${categoryId}`);
  return response.data;
};

// Search Movies
export const searchMovies = async (query: string) => {
  const response = await api.get(`/movies/search/${query}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData: any) => {
  const response = await api.put(`/users/me`, profileData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get(`/users/me`);
  return response.data;
};

// Rate a movie
export const rateMovie = async (movieId: string, rating: number) => {
  const response = await api.post(`/ratings`, { rating, movieId });
  return response.data;
};

export const getMovieRating = async (movieId: string) => {
  const response = await api.get(`/ratings/${movieId}`);
  return response.data;
};

// Fetch recommended movies
export const getRecommendedMovies = async (userId: string) => {
  const response = await api.get(`/movies/recommended/${userId}`);
  return response.data;
};
