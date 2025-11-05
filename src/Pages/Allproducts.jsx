import React from "react";
import { Link, useLoaderData, useNavigation } from "react-router";
import Loader from "./Loader/Loader";

const Allproducts = () => {
  const products = useLoaderData();
  const navigation = useNavigation();

  if(navigation.state === "loading"){
    return <Loader/>
  }
  return (
<div className="p-3 container mx-auto min-h-screen">
  <h2 className="text-3xl font-bold text-center text-gray-800">
    All <span className="text-purple-600">Products</span>: {products.length}
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
    {products.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
            On Sale
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {product.title}
          </h3>
          <p className="text-purple-600 font-medium mb-4">
            ${product.price}
          </p>
          <Link
            to={`/${product._id}`}
            className="block w-full text-center border border-purple-600 text-purple-600 font-semibold py-2 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Allproducts;
