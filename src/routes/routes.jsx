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
import CustomerMenu from "../Dashboard/Sidebar/CustomerMenu";
import ManageUsers from "../pages/Dashboard/Admin/ManageUser";
import Profile from "../components/Profile";
import SellerRoute from "./SelaRoutes";
import AdminRoute from "./AdminRoutes";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOder";
import PrivetRouter from "./PrivetRouter";

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
        path: "seller",
        element: <CustomerMenu />,
      },
      {
        path: "add-from",
        element: (
          <SellerRoute>
            <AddPlant />
          </SellerRoute>
        ),
      },
      {
        path: "plant",
        element: <Plant />,
      },
      {
        path: "oder",
        element: (
          <PrivetRouter>
            {" "}
            <MyOrders />
          </PrivetRouter>
        ),
      },
      {
        path: "user",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-inventory",
        element: (
          <SellerRoute>
            <MyInventory />
          </SellerRoute>
        ),
      },
      {
        path: "manageOrders",
        element: (
          <SellerRoute>
            <ManageOrders />
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default routes;
