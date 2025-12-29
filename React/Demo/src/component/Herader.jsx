import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <>
        <div className="d-flex justify-content-between p-2 bg-secondary text-black">
            <h3>My Website</h3>
            <div className="d-flex gap-3 align-items-center">
                <Link to={"/"} className="text-decoration-none text-light ">Home</Link>
                <Link to={"About"} className="text-decoration-none text-light ">About</Link>
                <Link to={"Product"} className="text-decoration-none text-light ">Product</Link>
                <Link to={"Contact"} className="text-decoration-none text-light ">Contact</Link>
                <Link to={"Login"} className="text-decoration-none text-light ">Login</Link>
                <Link to={"Signup"} className="text-decoration-none text-light ">Signup</Link>


            </div>
        </div>
        </>
    );
};

export default Header;