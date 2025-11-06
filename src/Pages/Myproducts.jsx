import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Authentications/AuthContext/AuthContext";
import Loader from "./Loader/Loader";
import NoDataFound from "./NoDataFound";

const Myproducts = () => {
  const { user , loading } = use(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bideInfo?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }
  }, [user?.email]);
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/bideInfo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("Bide removed successfully");
          const remainingBides = products.filter(
            (product) => product._id !== id
          );
          setProducts(remainingBides);
        }
      });
  };
  if(loading){
    return <Loader/>
  }
  if(products.length === 0){
    return <NoDataFound/>
  }
  return (
    <div className="p-6 min-h-screen container mx-auto  pt-18">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
        My Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {product.productName}
            </h2>
            <p className="text-gray-600 text-lg mt-1">
              Price: ${product.productPrice}
            </p>

            <button
              onClick={() => handleDelete(product._id)}
              className="mt-4 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg bg-transparent border border-red-500 transition-colors duration-200 w-full font-medium"
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myproducts;
