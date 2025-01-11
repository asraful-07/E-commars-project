import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-100">
      {/* Left Side: Sidebar Component */}
      <div className="w-64 bg-blue-900 text-white flex-shrink-0">
        <div className="p-4 text-center font-bold text-xl">
          <h1>My Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="home"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="/dashboard/seller"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                Become A Seller
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="plant"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                Plant
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="add-from"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                AddPant
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="my-inventory"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                My Inventory
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="manageOrders"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                ManageOrders
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="oder"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                My Oder
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                Manage User
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:bg-blue-700">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
