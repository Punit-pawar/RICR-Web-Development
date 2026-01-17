import React, { useState } from "react";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserTransections from "../../components/userDashboard/UserTransections";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex w-full h-[90vh] bg-rose-50 overflow-hidden">
      <div>
        <UserSidebar active={active} setActive={setActive} />
      </div>

      <div className="h-screen overflow-y-auto p-4 transition-all duration-300 w-full">
        {active === "overview" && <UserOverview />}
        {active === "profile" && <UserProfile />}
        {active === "orders" && <UserOrders />}
        {active === "transections" && <UserTransections />}
        {active === "helpdesk" && <UserHelpDesk />}
      </div>
    </div>
  );
};

export default UserDashboard;