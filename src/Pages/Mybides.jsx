import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Authentications/AuthContext/AuthContext";

const Mybides = () => {
  const { user } = use(AuthContext);
  const [bides, setBides] = useState([]);

  console.log('user?.email', user?.email);
  

  useEffect(() => {
    if (user?.email) {
       fetch(`http://localhost:3000/bideInfo?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBides(data);
        });
    }
  }, [user?.email]);
  return (
    <div>
      <h1>My bides</h1>
      {bides.map((bide) => (
        <div
          key={bide._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h2>Product ID: {bide.productId}</h2>
          <h3>Bider Name: {bide.buyerName}</h3>
          <h3>Bider Email: {bide.buyerEmail}</h3>
          <h3>Bide Amount: {bide.bideAmount}</h3>
          <button className="btn btn-error">Remove Bid</button>
        </div>
      ))}
    </div>
  );
};

export default Mybides;
