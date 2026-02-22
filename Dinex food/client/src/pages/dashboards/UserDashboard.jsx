import React, { useState, useEffect } from "react";
import UserSideBar from "../../components/userDashboard/UserSideBar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";
import UserTransactions from "../../components/userDashboard/UserTransactions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react"; // Added for premium error icon

const UserDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  // ---------------- PREMIUM UNAUTHORIZED STATE ----------------
  if (role !== "customer") {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FCF8F3] p-4">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Access Denied</h2>
          <p className="text-gray-500 font-medium mb-8">
            You must be logged in as a Customer to view this dashboard.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-purple-600 transition-colors shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    // 1. PARENT: overflow-hidden stops the main window from scrolling
    // (Adjust h-[90vh] to h-screen or h-[calc(100vh-80px)] based on your header height)
    <div className="w-full h-[90vh] flex overflow-hidden bg-[#FCF8F3]">
      
      {/* 2. SIDEBAR: It handles its own width via Framer Motion, just render it! */}
      <UserSideBar
        active={active}
        setActive={setActive}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* 3. MAIN CONTENT: flex-1 takes remaining space, overflow-y-auto allows ONLY this box to scroll */}
      <div className="flex-1 h-full overflow-y-auto relative w-full scrollbar-hide">
        {active === "overview" && <UserOverview />}
        {active === "profile" && <UserProfile />}
        {active === "orders" && <UserOrders />}
        {active === "transactions" && <UserTransactions />}
        {active === "helpdesk" && <UserHelpDesk />}
      </div>

    </div>
  );
};

export default UserDashboard;