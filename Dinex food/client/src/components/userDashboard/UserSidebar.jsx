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

const UserSidebar = ({
  active,
  setActive,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("DineXUser");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <div className="h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center h-20 px-2 border-b border-gray-100">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-purple-100 hover:text-purple-600 text-gray-600 w-16 flex justify-center"
            >
              <Menu size={24} />
            </button>
    
            {!isCollapsed && (
              <div className="font-bold text-xl text-gray-600 ml-2">
                Dashboard
              </div>
            )}
          </div>

      <nav className="flex-1 px-2 py-6 space-y-2">
        <button
          onClick={() => setActive("overview")}
          className={`flex items-center w-full py-3 rounded-xl ${
            active === "overview"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <div className="w-16 flex justify-center">
            <LayoutDashboard size={22} />
          </div>
          {!isCollapsed && <span>Overview</span>}
        </button>

        <button
          onClick={() => setActive("profile")}
          className={`flex items-center w-full py-3 rounded-xl ${
            active === "profile"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <div className="w-16 flex justify-center">
            <UserRound size={22} />
          </div>
          {!isCollapsed && <span>Profile</span>}
        </button>

        <button
          onClick={() => setActive("orders")}
          className={`flex items-center w-full py-3 rounded-xl ${
            active === "orders"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <div className="w-16 flex justify-center">
            <ArchiveRestore size={22} />
          </div>
          {!isCollapsed && <span>Orders</span>}
        </button>

        <button
          onClick={() => setActive("transactions")}
          className={`flex items-center w-full py-3 rounded-xl ${
            active === "transactions"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <div className="w-16 flex justify-center">
            <ArrowLeftRight size={22} />
          </div>
          {!isCollapsed && <span>Transections</span>}
        </button>

        <button
          onClick={() => setActive("helpdesk")}
          className={`flex items-center w-full py-3 rounded-xl ${
            active === "helpdesk"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <div className="w-16 flex justify-center">
            <Info size={22} />
          </div>
          {!isCollapsed && <span>Help Desk</span>}
        </button>

      </nav>
      <div className="p-2 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center w-full py-3 rounded-xl hover:bg-purple-200"
              >
                <div className="w-16 flex justify-center">
                  <LogOut size={22} className="text-purple-600" />
                </div>
                {!isCollapsed && (
                  <span className="text-purple-600 font-medium">Log Out</span>
                )}
              </button>
            </div>

    </div>
  );
};

export default UserSidebar;
