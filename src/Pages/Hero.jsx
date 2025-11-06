import React from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <svg 
          className="absolute top-0 right-0 w-1/2 h-full text-purple-200 transform translate-x-1/2 -translate-y-1/4" 
          fill="none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 50 50, 50 0, 100 0" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        <svg 
          className="absolute bottom-0 left-0 w-1/2 h-full text-pink-200 transform -translate-x-1/2 translate-y-1/4 rotate-180" 
          fill="none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 50 50, 50 0, 100 0" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900">
          Deal Your <span className="text-purple-700">Products</span> 
          <br />
          In A <span className="text-purple-700">Smart Way</span> !
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          SmartDeals helps you sell, resell, and shop from trusted local sellers all in one place!
        </p>
        <div className="flex flex-col items-center space-y-4">

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            
            <Link to="/all-products" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
              Watch All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;