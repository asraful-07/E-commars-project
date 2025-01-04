import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import Title from "../components/Title";
import Plant from "../components/Plant";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import MyOrders from "../pages/Customer/MyOrders";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/plant/:id",
        element: <PlantDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <Title />,
      },
      {
        path: "add-from",
        element: <AddPlant />,
      },
      {
        path: "plant",
        element: <Plant />,
      },
      {
        path: "oder",
        element: <MyOrders />,
      },
    ],
  },
]);

export default routes;
