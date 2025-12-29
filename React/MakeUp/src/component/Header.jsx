import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex justify-between bg-amber-200 items-center h-15">

        <div className="text-4xl fw-bold italic ms-5 cursor-pointer text-fuchsia-500">
          Glow More
        </div>

        <div className="flex gap-4 me-5 font-medium">
          <Link to={"/"} className="text-decoration-none text-black"> Home </Link>
          <Link to={"About"} className="text-decoration-none text-black"> About </Link>
          <Link to={"Product"} className="text-decoration-none text-black"> Product </Link>
          <Link to={"Contact"} className="text-decoration-none text-black"> Contact </Link>
          <Link to={"Login"} className="text-decoration-none text-black ">Login</Link>
          <Link to={"SignUp"} className="text-decoration-none text-black ">SignUp</Link>
        </div>

      </div>
    </>
  );
};

export default Header;
