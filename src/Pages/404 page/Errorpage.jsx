import React from "react";
import { Link } from "react-router";

const Page404 = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-purple-600 mb-6">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Page404;
