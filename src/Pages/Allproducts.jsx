import React from "react";
import { Link, useLoaderData } from "react-router";

const Allproducts = () => {
  const products = useLoaderData();
  return (
    <div>
      <h2>All products: {products.length}</h2>
     <div className="grid grid-cols-3 gap-4 mt-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <img src={product.image} alt="" />
            <Link to={`/${product._id}`} className="btn btn-info">View details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
