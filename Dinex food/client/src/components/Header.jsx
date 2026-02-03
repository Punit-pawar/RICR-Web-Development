import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

  const { user , isLogin } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="bg-purple-300 px-4 py-2 flex justify-between items-center">

        <Link to={"/"}>
          <img src={logo} alt="" className="h-12 w-20 object-cover invert-100 hover:scale-105 cursor-pointer"/>
        </Link>

        <div className="flex ms-30 gap-4">

          <Link to={"/"} className="text-decoration-none text-black hover:text-purple-800 hover:text-shadow-2xs">
            Home
          </Link>

          <Link to={"/about"} className="text-decoration-none text-black hover:text-purple-800 hover:text-shadow-2xs">
            About
          </Link>

          <Link to={"/contact"} className="text-decoration-none text-black hover:text-purple-800 hover:text-shadow-2xs">
            Contact
          </Link>

        </div>

        <div className="flex gap-4">
          {isLogin ? (
            <div
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/UserDashboard")}
            >
              {user.fullName}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded "
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded "
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* <div className="flex gap-4">
          
          <button onClick={()=>navigate("/login")} 
          className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded-3xl">
            Login
          </button>

          <button onClick={()=>navigate("/register")} 
          className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded-3xl">
            Register
          </button>

        </div> */}
        
      </div>
    </>
  );
};

export default Header;