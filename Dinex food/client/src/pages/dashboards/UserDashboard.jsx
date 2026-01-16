import React, { useState } from "react";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransections from "../../components/userDashboard/UserTransections";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");

  return (
    <>
      <div className="flex h-[90vh] w-full">
        <div className="bg-(--color-background) border-green-500 w-1/7">
          <UserSidebar active={active} setActive={setActive} />
        </div>
        <div className="border border-red-500 w-6/7">
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "orders" && <UserOrders />}
          {active === "transections" && <UserTransections />}
          {active === "helpdesk" && <UserHelpDesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
