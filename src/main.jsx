import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home/Home.jsx";
import Mainmother from "./Mainmother/Mainmother.jsx";
import Login from "./Authentications/Login/Login.jsx";
import Register from "./Authentications/Registration/Registration.jsx";
import AuthProvider from "./Authentications/AuthProvider/AuthProvider.jsx";
import ProductDetails from "./Pages/Home/productDetails.jsx";
import Allproducts from "./Pages/Allproducts.jsx";
import Mybides from "./Pages/Mybides.jsx";
import Myproducts from "./Pages/Myproducts.jsx";
import Page404 from "./Pages/404 page/Errorpage.jsx";
import PrivetRouter from "./Pages/PrivetRouter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainmother,
    errorElement: <Page404/>,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => {
          return fetch("http://localhost:3000/myProducts");
        },
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/myProducts/${params.id}`),
        element: <PrivetRouter><ProductDetails/></PrivetRouter>,
      },
      {
        path: "/all-products",
        Component: Allproducts,
        loader: () => fetch("http://localhost:3000/myProducts"),
      },
      {
        path: "/my-bids",
        element: <PrivetRouter><Mybides/></PrivetRouter>,
      },
      {
        path: "*",
        element: <Page404/>,
      },
      {
        path: "/my-products",
        element: <PrivetRouter><Myproducts/></PrivetRouter>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
