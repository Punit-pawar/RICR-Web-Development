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
        <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
          <div className="text-5xl text-red-600">⊗</div>
          <div className="text-xl">
            You are not login as Manager. Please Login Again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] flex">
      <div
        className={`bg-white duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <ResturantSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {active === "overview" && <ResturantOverview />}
        {active === "profile" && <RestaurantProfile />}
        {active === "menuitem" && <RestaurantMenu />}
        {active === "orders" && <RestaurantOrders />}
        {active === "earnings" && <RestaurantEarnings />}
        {active === "helpdesk" && <RestaurantHelpDesk />}
      </div>
    </div>
  );
};

export default ResturantDashboard;
