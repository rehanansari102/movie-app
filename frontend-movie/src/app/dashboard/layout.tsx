// app/dashboard/layout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate an API call to check authentication
    const token = localStorage.getItem('authToken'); // You might be using cookies or other storage methods

    if (!token) {
      router.push('/'); // Redirect to login page if not authenticated
    } else {
      setAuthenticated(true); // If token exists, allow access
    }
  }, [router]);

  // Optionally render a loading spinner while checking authentication
  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-indigo-600 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
         
          <h1 className="text-white text-xl font-bold">My Dashboard</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a
            href="/dashboard"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </a>
          {/* <a
            href="/dashboard/movies"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            Movies
          </a> */}
          <a
            href="/dashboard/profile"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile
          </a>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <img
            src="/profile.png" // Replace with a dynamic profile image
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
          <button
            className="text-white hover:bg-indigo-500 pr-3 py-2 rounded-md text-sm font-medium"
            onClick={() => {
              // Handle logout
              localStorage.removeItem('authToken');
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main className="container mx-auto py-6">
      {children}
    </main>
  </div>
  );
}