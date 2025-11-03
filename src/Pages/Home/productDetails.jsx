import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Authentications/AuthContext/AuthContext";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user, loading } = use(AuthContext);
const [bid, setBide] = useState(null);


  const displayName = user?.displayName;
  const email = user?.email;

  const { title, image, description, price, _id } = product;
  const productRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/myProducts/bideInfo/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBide(data);
      });
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please Login to see product details</div>;
  }

  const handlemodal = () => {
    productRef.current.showModal();
  };
  const handleBide = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const bide = e.target.bide.value;
    console.log(email, name, bide, _id);

    const bideInfo = {
      productId: _id,
      buyerName: name,
      buyerEmail: email,
      bideAmount: bide,
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
        if(data.insertedId){
            bideInfo._id = data.insertedId;
          const updatedBids = [...bid, bideInfo];
          updatedBids.sort((a, b) => b.bideAmount - a.bideAmount);
          setBide(updatedBids);
          productRef.current.close();
        }
      });
  };

  return (
    <div>
      <p>{title}</p>
      <img src={image} alt="" />
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={handlemodal} className="btn btn-primary">
        I want to buy this product
      </button>
      <dialog ref={productRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            <form onSubmit={handleBide} className="flex flex-col">
              <input
                className="px-2"
                type="text"
                name="name"
                defaultValue={displayName}
                readOnly
                placeholder="Inter Your Number"
              />
              <input
                className="px-2"
                type="Email"
                name="email"
                defaultValue={email}
                readOnly
                placeholder="Inter Your Email"
              />
              <label>Your Bid:</label>
              <input
                className="px-2"
                type="number"
                name="bide"
                placeholder="Enter your bid amount"
              />
              <br />
              <br />
              <button className="btn btn-secondary">Place Your Bide</button>
            </form>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="bide">
        <h2 className="text-2xl font-bold">Bide Information</h2>
        {bid &&
          bid.map((bideInfo) => (
            <div key={bideInfo._id} className="border p-4 rounded-lg shadow-md">
                <p>Buyer Name: {bideInfo.buyerName}</p>
                <p>Buyer Email: {bideInfo.buyerEmail}</p>
                <p>Bide Amount: {bideInfo.bideAmount}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
