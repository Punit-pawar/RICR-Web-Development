import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ResturantSidebar from "../../components/resturantdashboard/ResturantSidebar";
import ResturantOverview from "../../components/resturantdashboard/ResturantOverview";
import RestaurantMenu from "../../components/resturantdashboard/RestaurantMenu";
import RestaurantProfile from "../../components/resturantdashboard/RestaurantProfile";
import RestaurantOrders from "../../components/resturantdashboard/RestaurantOrders";
import RestaurantEarnings from "../../components/resturantdashboard/RestaurantEarnings";
import RestaurantHelpDesk from "../../components/resturantdashboard/RestaurantHelpDesk";

const ResturantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "manager") {
    return (
      <div className="p-3">
        <div className="border border-gray-200 rounded-2xl shadow-sm p-8 max-w-lg mx-auto text-center bg-white mt-20">
          <div className="text-5xl text-red-500 mb-4">⊗</div>
          <div className="text-lg font-bold text-gray-800">
            Access Denied
          </div>
          <p className="text-gray-500 text-sm mt-2">
            You are not logged in as a Manager. Please login with the correct credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FCF8F3]">
      
      {/* Sidebar Component 
        Note: It already contains its own <aside className="fixed left-0..."> logic, 
        so we just render it directly without extra wrappers.
      */}
      <ResturantSidebar
        active={active}
        setActive={setActive}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area 
        The margin-left dynamically adjusts to exactly match the Sidebar's Framer Motion widths 
        (280px when open, 88px when collapsed).
      */}
      <main 
        className={`p-4 md:p-8 transition-[margin] duration-300 ease-out
          ${isCollapsed ? "ml-[88px]" : "ml-[280px]"}
        `}
      >
        <div className="max-w-7xl mx-auto w-full">
          {active === "overview" && <ResturantOverview />}
          {active === "profile" && <RestaurantProfile />}
          {active === "menuitem" && <RestaurantMenu />}
          {active === "orders" && <RestaurantOrders />}
          {active === "earnings" && <RestaurantEarnings />}
          {active === "helpdesk" && <RestaurantHelpDesk />}
        </div>
      </main>

    </div>
  );
};

export default ResturantDashboard;