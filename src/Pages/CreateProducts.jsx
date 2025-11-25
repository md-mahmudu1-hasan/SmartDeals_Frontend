// import axios from "axios";
import React from "react";
import UseAxios from "../Hooks/useAxios";

const CreateProducts = () => {
  const handleproduct = (e) => {
    const axiosInstance = UseAxios();

    e.preventDefault();
    const product_name = e.target.product_name.value;
    const image_url = e.target.image_url.value;
    const min_prize = e.target.min_prize.value;
    const productInfo = {
      title: product_name,
      image: image_url,
      price: min_prize,
    };

    axiosInstance.post("/myproducts", productInfo).then((data) => {
      console.log(data.data);
    });

    // axios
    //   .post("https://smart-project-five.vercel.app/myproducts", productInfo)
    //   .then((response) => {
    //     console.log("response", response.data);

    //     if (response.data.insertedId) {
    //       alert("Product created successfully");
    //       e.target.reset();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error creating the product!", error);
    //   });
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        New product
      </h2>
      <form onSubmit={handleproduct}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="product_name"
            required
            placeholder="Enter Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL:
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            placeholder="Image URL: https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="min_prize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Price ($):
          </label>
          <input
            type="number"
            id="min_prize"
            name="min_prize"
            min="0"
            step="0.01"
            required
            placeholder="Minimum Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="max_prize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Maximum Price($):
          </label>
          <input
            type="number"
            id="max_prize"
            name="max_prize"
            min="0"
            step="0.01"
            required
            placeholder="Maximum Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProducts;
