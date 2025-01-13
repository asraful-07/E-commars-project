import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import AdminStatistics from "./AdminStatistics";
import useRole from "../hooks/UseRole";

const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <h1>loading.......</h1>;
  if (role === "customer") return <Navigate to="/dashboard/my-orders" />;
  if (role === "seller") return <Navigate to="/dashboard/my-inventory" />;
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
