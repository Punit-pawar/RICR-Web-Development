import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <>
        <div className="d-flex justify-content-between p-2 bg-primary text-black">
            <h3>My Website</h3>
            <div className="d-flex gap-3 align-items-center">
                <Link to={"/"} className="text-decoration-none text-black ">Home</Link>
                <Link to={"About"} className="text-decoration-none text-light ">About</Link>
                <Link to={"Product"} className="text-decoration-none text-light ">Product</Link>
                <Link to={"Contect"} className="text-decoration-none text-light ">Contect</Link>
            </div>
        </div>
        </>
    );
};

export default Header;