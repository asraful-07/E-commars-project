import { Navigate } from "react-router-dom";
import useRole from "../hooks/UseRole";

const SellerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <h1>loading.......</h1>;
  if (role === "seller") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

SellerRoute.propTypes = {
  children: PropTypes.element,
};

export default SellerRoute;
