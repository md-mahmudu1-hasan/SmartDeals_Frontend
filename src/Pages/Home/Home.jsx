import React from "react";
import { Link, useLoaderData, useNavigation } from "react-router";
import Loader from "../Loader/Loader";

const Home = () => {
  const products = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loader/>
  }
  const limitedProducts = products.slice(0, 9);
  return (
    <div className="container mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mt-8 text-gray-800">
        <span className="text-purple-600">All</span> Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {limitedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-100"
          >
            <div className="bg-gray-200 h-48 w-full">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300x192?text=Product+Image"
                }
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute top-0 left-0 mt-3 ml-3 bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-0.5 rounded-full tracking-wider">
              On Sale
            </div>
            <div className="p-4">
              <h3 className="text-gray-700 text-base font-medium mb-1 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-900 text-lg font-bold mb-4">
                $ {product.price}
              </p>
              <Link
                to={`/${product._id}`}
                className="block w-full text-center bg-white border border-purple-500 text-purple-500 font-semibold py-2 rounded hover:bg-purple-500 hover:text-white transition duration-200"
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

export default Home;
