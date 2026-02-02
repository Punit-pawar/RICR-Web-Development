import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  UserRound,
  ArchiveRestore,
  ArrowLeftRight,
  Info,
  Menu,
  LogOut,
} from "lucide-react";

const UserSidebar = ({ active, setActive }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const logoutnavigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      navigate("/");
      sessionStorage.removeItem("DineXUser");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
      console.log(error);
    }
  };

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col
        ${expanded ? "w-72" : "w-20"}
      `}
    >
      <div className="flex items-center h-20 px-2 border-b border-gray-100 shrink-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors bg-white  w-16 flex justify-center items-center cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <div
          className={`font-bold text-xl text-gray-600 overflow-hidden transition-all duration-300 whitespace-nowrap
            ${expanded ? "w-40 ml-2 opacity-100" : "w-0 ml-0 opacity-0"}
          `}
        >
          Dashboard
        </div>
      </div>

      <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        <button
          onClick={() => setActive("overview")}
          className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200
            ${
              active === "overview"
                ? "bg-blue-600 text-white shadow-md shadow-bule-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }
          `}
        >
          <div className="min-w-16 flex justify-center items-center">
            <LayoutDashboard size={22} />
          </div>

          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}`}
          >
            Overview
          </span>
        </button>

        <button
          onClick={() => setActive("profile")}
          className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200
            ${
              active === "profile"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }
          `}
        >
          <div className="min-w-16 flex justify-center items-center">
            <UserRound size={22} />
          </div>
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}`}
          >
            Profile
          </span>
        </button>

        <button
          onClick={() => setActive("orders")}
          className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200
            ${
              active === "orders"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }
          `}
        >
          <div className="min-w-16 flex justify-center items-center">
            <ArchiveRestore size={22} />
          </div>
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}`}
          >
            Orders
          </span>
        </button>

        <button
          onClick={() => setActive("transections")}
          className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200
            ${
              active === "transections"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }
          `}
        >
          <div className="min-w-16 flex justify-center items-center">
            <ArrowLeftRight size={22} />
          </div>
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}`}
          >
            Transactions
          </span>
        </button>

        <button
          onClick={() => setActive("helpdesk")}
          className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200
            ${
              active === "helpdesk"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }
          `}
        >
          <div className="min-w-16 flex justify-center items-center">
            <Info size={22} />
          </div>
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}`}
          >
            Help Desk
          </span>
        </button>

        <div className="p-2 border-t border-gray-100 shrink-0 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            className="relative flex items-center w-full py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group cursor-pointer"
          >
            <div className="min-w-16 flex justify-center items-center ">
              <LogOut
                size={22}
                className="group-hover:rotate-180 text-blue-600 hover:text-red-600 transition-transform duration-300 text-blur-600"
              />
            </div>
            <span
              className={`overflow-hidden transition-all duration-300 whitespace-nowrap font-medium text-blue-600 
              ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}
            `}
            >
              Log Out
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default UserSidebar;
