"use client";
import React, { useEffect, useState } from "react";
import { getCategories, getMovies, getMoviesByCategory } from "@/services/api";
import StarRating from "../components/starRating";
import SkeletonLoader from "../components/SkeletonLoader"; // Import the SkeletonLoader component

interface Category {
  _id: string;
  name: string;
}

interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
}

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      if (token) {
        setLoading(true);
        try {
          const data = await getCategories(token);
          setCategories(data);
        } catch (error) {
          setError("Failed to fetch categories");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (token) {
        setLoading(true);
        try {
          const data = selectedCategory 
            ? await getMoviesByCategory(selectedCategory, token) 
            : await getMovies(token);
          setMovies(data);
        } catch (error) {
          setError("Failed to fetch movies");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-black font-bold mb-6 text-center">
        Browse Movies
      </h1>

    

      {error && <p className="text-center text-red-500">{error}</p>}

    
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 p-2 block text-black w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-150 ease-in-out"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
     
        {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg text-black font-semibold">{movie.title}</h2>
              <p className="text-gray-600">{movie.description}</p>
              <img
                src={"https://placehold.co/600x400"}
                alt={movie.title}
                className="mt-2 rounded-md w-full h-48 object-cover"
              />
              <div className="mt-2">
                <StarRating rating={movie.rating} />
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-600 text-left">No movies found.</p>
        )}
      </div>
    </div>
  );
}
