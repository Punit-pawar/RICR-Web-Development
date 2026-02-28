import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RiderOverview from "../../components/riderdashboard/RiderOverview";
import RiderProfile from "../../components/riderdashboard/RiderProfile";
import RiderOrders from "../../components/riderdashboard/RiderOrders";
import RiderHelpDesk from "../../components/riderdashboard/RiderHelpDesk";
import RiderSidebar from "../../components/riderdashboard/RiderSidebar"
import RiderOrderHistory from "../../components/riderdashboard/RiderOrderHistory";



const RiderDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "partner") {
    return (
      <div className="p-3">
        <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
          <div className="text-5xl text-red-600">⊗</div>
          <div className="text-xl">
            You are not login as partner. Please Login Again.
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
        <RiderSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {active === "overview" && <RiderOverview />}
        {active === "profile" && <RiderProfile />}
        {active === "orders" && <RiderOrders />}
        {active === "OrderHistory" && <RiderOrderHistory />}
        {active === "helpdesk" && <RiderHelpDesk />}
      </div>
    </div>
  );
};

export default RiderDashboard;
