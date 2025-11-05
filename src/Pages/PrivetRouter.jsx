import { use } from "react";
import { AuthContext } from "../Authentications/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "./Loader/Loader";

const PrivetRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  if (loading) {
    return <Loader/>
  }
  if (!user) {
    return <Navigate to="/login" replace state={location?.pathname}/>
  }
  return children;
};

export default PrivetRouter;
