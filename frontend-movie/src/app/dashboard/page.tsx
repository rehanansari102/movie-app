"use client";
import React, { useEffect, useState } from "react";
import {
  getCategories,
  getMovies,
  getMoviesByCategory,
  searchMovies,
  getMovieRating,
  rateMovie,
} from "@/services/api";
import StarRating from "../components/starRating";
import SkeletonLoader from "../components/SkeletonLoader";
import router from "next/router";
import { ToastContainer } from "react-toastify";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({}); // Explicitly type the ratings object

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMoviesAndRatings = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery);
        } else if (selectedCategory) {
          data = await getMoviesByCategory(selectedCategory);
        } else {
          data = await getMovies();
        }
        setMovies(data);

        // Fetch ratings for each movie
        const ratingsData: any = {};
        for (const movie of data) {
          const ratingData = await getMovieRating(movie._id);
          ratingsData[movie._id] = ratingData?.rating || 0;
        }
        setRatings(ratingsData);
      } catch (error : any) {
        setError("Failed to fetch movies and ratings");
       
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesAndRatings();
  }, [selectedCategory, searchQuery]);

  const handleRatingChange = async (movieId: string, rating: number) => {
    try {
      await rateMovie(movieId, rating);
      setRatings((prevRatings) => ({
        ...prevRatings,
        [movieId]: rating,
      }));
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedCategory("");
    const data = await searchMovies(searchQuery);
    setMovies(data);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-black font-bold mb-6 text-center">
        Browse Movies
      </h1>
      <ToastContainer />
      <div className="mb-4 flex justify-between gap-4 bg-white rounded-lg shadow-md p-4">
        <div className="w-1/2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 p-2 block text-black w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-150 ease-in-out"
          >
            <option value="">All Categories</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/2">
          <form onSubmit={handleSearch}>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Movies:
            </label>
            <input
              id="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="mt-1 p-2 block text-black w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </form>
        </div>
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: any) => (
          <div key={movie?._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg text-black font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.description}</p>
            <img
              src={"https://placehold.co/600x400"}
              alt={movie.title}
              className="mt-2 rounded-md w-full h-48 object-cover"
            />
            <div className="mt-2">
            
              <StarRating
              movieTitle={movie.title}
                rating={ratings[movie?._id] || 0}
                onRatingChange={(newRating: any) =>
                  handleRatingChange(movie._id, newRating)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
