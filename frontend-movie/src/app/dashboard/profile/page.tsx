// app/profile/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "@/services/api"; // Adjust the import based on your API service

interface UserProfile {
  name: string;
  email: string;
  address: string;
  image: string; // URL to the user's profile image
  dob: string; // Date of birth
  categories: string[]; // Array of categories the user is interested in
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const data = await getUserProfile(token);
          setProfile(data?.data);
        } catch (error) {
          setError("Failed to fetch user profile");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && (
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      )}

      {error && (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {profile && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl text-black font-bold text-center mb-4">Profile</h1>
          <div className="flex flex-col items-center mb-6">
            <img
              src={"https://placehold.co/200x200"}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-2 border-indigo-500 mb-4"
            />
            <h2 className="text-2xl text-black font-semibold">{profile.name}</h2>
            <p className="text-gray-600 text-black">{profile.email}</p>
            <p className="text-gray-600 text-black">{profile.address}</p>
            <p className="text-gray-600">Date of Birth: {new Date(profile.dob).toLocaleDateString()}</p>
          </div>

        
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
