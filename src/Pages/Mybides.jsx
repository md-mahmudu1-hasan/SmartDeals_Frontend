import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Authentications/AuthContext/AuthContext";
import { Loader } from "lucide-react";
import NoDataFound from "./NoDataFound";

const Mybides = () => {
  const { user , loading } = use(AuthContext);
  const [bides, setBides] = useState([]);
  

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bideInfo?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBides(data);
        });
    }
  }, [user?.email]);

if(loading){
  return <Loader/>
}
if(bides.length === 0){
  return <NoDataFound/>
}

  const handlebideremove = (_id) => {
    fetch(`http://localhost:3000/bideInfo/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("Bide removed successfully");
          const remainingBides = bides.filter((bide) => bide._id !== _id);
          setBides(remainingBides);
        }
      });
  };
  return (
    <div className="p-6 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Bids: <span className="text-purple-600">{bides.length}</span>
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">SL No</th>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Bid Price</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bides.map((bide, index) => (
              <tr
                key={bide._id}
                className="hover:bg-gray-50 transition duration-200 text-gray-700"
              >
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={bide.productImage}
                      alt={bide.productName}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div>
                      <h3 className="text-xs pr-3 font-semibold text-gray-800">
                        {bide.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${bide.productPrice}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 pl-6 border-b font-medium text-gray-800">
                  ${bide.bideAmount}
                </td>
                <td className="py-3 px-4 border-b">
                  <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handlebideremove(bide._id)}
                    className="text-red-500 border border-red-400 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-200 font-medium"
                  >
                    Remove Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>  
      </div>
    </div>
  );
};

export default Mybides;
