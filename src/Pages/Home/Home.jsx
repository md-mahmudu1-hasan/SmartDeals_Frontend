import React from "react";
import { Link, useLoaderData, useNavigation } from "react-router";

const Home = () => {
  const products = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <div>Loading...</div>;
  }
  const limitedProducts = products.slice(0, 10);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-8">
        Welcome to Home Page
      </h2>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {limitedProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <img src={product.image} alt="" />
            <p>price: {product.price}</p>
            <p>{product.sku}</p>
            <p>stock: {product.stock}</p>
            <Link to={`/${product._id}`} className="btn btn-info">View details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
