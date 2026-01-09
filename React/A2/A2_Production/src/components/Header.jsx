import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-between p-2 bg-secondary text-black">
        <h3>AP PRoduction and Events</h3>
        <div className="d-flex gap-3 align-items-center">
          <Link to={"/"} className="text-decoration-none text-light ">
            Home
          </Link>
          <Link to={"Events"} className="text-decoration-none text-light ">
            Events
          </Link>
          <Link to={"Production"} className="text-decoration-none text-light ">
            Production
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
