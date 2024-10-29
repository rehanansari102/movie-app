// components/SkeletonLoader.tsx

import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-48 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
    </div>
  );
};

export default SkeletonLoader;
