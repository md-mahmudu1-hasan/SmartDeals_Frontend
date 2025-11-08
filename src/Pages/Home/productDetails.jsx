import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Authentications/AuthContext/AuthContext";
import NoDataFound from "../NoDataFound";
import Loader from "../Loader/Loader";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user, loading } = use(AuthContext);
  const [bid, setBide] = useState([]);

  const displayName = user?.displayName;
  const email = user?.email;

  const { title, image, description, price, _id } = product;
  const productRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/myProducts/bideInfo/${_id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken} `,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBide(data);
      });
  }, [_id, user]);

  if (loading) {
    return <Loader />;
  }
  if (!product) {
    return <NoDataFound />;
  }

  const handlemodal = () => {
    productRef.current.showModal();
  };
  const handleBide = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const bide = e.target.bide.value;

    const bideInfo = {
      productId: _id,
      buyerName: name,
      buyerEmail: email,
      bideAmount: bide,
      productName: title,
      productImage: image,
      productPrice: price,
      productDescription: description,
    };
    fetch("http://localhost:3000/bideInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bideInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Bide placed successfully");
        e.target.reset();
        if (data.insertedId) {
          bideInfo._id = data.insertedId;
          const updatedBids = [...bid, bideInfo];
          updatedBids.sort((a, b) => b.bideAmount - a.bideAmount);
          setBide(updatedBids);
          productRef.current.close();
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-6 pt-20">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold text-purple-600">{title}</h2>
          <p className="text-gray-600">{description}</p>
          <p className="text-xl font-semibold text-green-600">${price}</p>
          <button
            onClick={handlemodal}
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            I want to buy this product
          </button>
        </div>
      </div>
      <dialog ref={productRef} className="modal p-0">
        <div className="modal-box rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-600 mb-4">
            Place Your Bid
          </h3>
          <form onSubmit={handleBide} className="flex flex-col gap-4">
            <input
              className="px-4 py-2 border rounded-lg w-full"
              type="text"
              name="name"
              defaultValue={displayName}
              readOnly
            />
            <input
              className="px-4 py-2 border rounded-lg w-full"
              type="email"
              name="email"
              defaultValue={email}
              readOnly
            />
            <label className="font-medium text-purple-600">Your Bid:</label>
            <input
              className="px-4 py-2 border rounded-lg w-full"
              type="number"
              name="bide"
              placeholder="Enter your bid amount"
            />
            <button
              type="submit"
              className="btn btn-secondary bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Place Your Bid
            </button>
          </form>
          <div className="modal-action mt-4">
            <form method="dialog">
              <button className="btn bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {bid.length === 0 ? (
        <p className="text-center text-gray-600 text-4xl font-semibold mt-10 border-2 border-gray-200 p-4">
          <span className="text-purple-600">No bids</span> placed yet
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b">SL No</th>
                <th className="py-3 px-4 border-b">Bidder Name</th>
                <th className="py-3 px-4 border-b">Bidder Email</th>
                <th className="py-3 px-4 border-b">Bid Price</th>
                <th className="py-3 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {bid.map((bide, index) => (
                <tr
                  key={bide._id}
                  className="hover:bg-gray-50 transition duration-200 text-gray-700"
                >
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-3">
                      {bide.buyerName}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <h3 className="font-semibold text-gray-800">
                      {bide.buyerEmail}
                    </h3>
                  </td>
                  <td className="py-3 px-4 border-b">${bide.productPrice}</td>
                  <td className="py-3 px-4 border-b">
                    <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
