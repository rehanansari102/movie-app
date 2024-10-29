"use client";
import { login, signup } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthenticationForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const router = useRouter();
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(""); // Reset error message when toggling between forms
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        // Login API call
        const response = await login({ email: formData.email, password: formData.password });
        if(response){
          localStorage.setItem("authToken", response.accessToken);
          router.push('/dashboard');
        }
        // Handle login success
      } else {
        // Signup API call
        const response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if(response){
          localStorage.setItem("authToken", response.accessToken);
          router.push('/dashboard');
        }
        // Handle signup success
      }
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      // Catch error and set the error message
      setErrorMessage(
        isSignIn
          ? "Invalid email or password. Please try again."
          : "Signup failed. Please check your details and try again."
      );
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-black text-center mb-6">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name field, only visible for signup */}
        <div className={isSignIn ? "hidden" : ""}>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required={!isSignIn} // Name is only required for signup
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="********"
          />
        </div>

        {/* Error message display */}
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* Toggle between Sign In and Sign Up */}
      <div className="text-center text-sm text-gray-600 mt-4">
        {isSignIn ? "New here?" : "Already have an account?"}{" "}
        <button
          onClick={handleToggle}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </>
  );
};

export default AuthenticationForm;
