import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 bg-purple-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
