import React from "react";

const NoDataFound = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 bg-gray-50">
      <svg
        className="w-24 h-24 text-purple-600 mb-6 animate-pulse"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-4h6v4m2 0H7m8-12H9m0 0V5h6v2m0 0h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2z"
        />
      </svg>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        {message || "No Data Found"}
      </h2>
      <p className="text-gray-500 text-center max-w-sm">
        Sorry, there is no data to display here at the moment.
      </p>
    </div>
  );
};

export default NoDataFound;
