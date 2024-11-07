"use client";
import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/services/api"; // Update API imports as needed

interface UserProfile {
  name: string;
  email: string;
  address: string;
  image: string;
  dateOfBirth: string;
  categories: string[];
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data?.data);
        setFormData(data?.data);
      } catch (error) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditToggle = () => setEditMode((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as UserProfile);
  };

  const handleUpdateProfile = async () => {
    if (!formData) return;
    try {
      setLoading(true);
      await updateUserProfile(formData);
      setProfile(formData);
      setEditMode(false);
    } catch (error) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

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
              src={profile.image || "https://placehold.co/200x200"}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-2 border-indigo-500 mb-4"
            />

            {!editMode ? (
              <>
                <h2 className="text-2xl text-black font-semibold">{profile.name}</h2>
                <p className="text-gray-600 text-black">{profile.email}</p>
                <p className="text-gray-600 text-black">{profile.address}</p>
                <p className="text-gray-600">Date of Birth: {profile.dateOfBirth ?new Date(profile.dateOfBirth).toLocaleDateString() :"N/A"}</p>
                <button
                  onClick={handleEditToggle}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form className="w-full max-w-sm space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded text-black"
                />
                <input
                  type="email"
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded text-black"
                />
                <input
                  type="text"
                  name="address"
                  value={formData?.address || ""}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full p-2 border rounded text-black"
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData?.dateOfBirth ?  new Date(formData?.dateOfBirth || "").toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
