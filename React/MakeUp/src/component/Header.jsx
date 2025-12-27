import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <>
        <div>
            <h3>My Website</h3>
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"About"}>About</Link>
                <Link to={"Product"}>Product</Link>
                <Link to={"Contact"}>Contact</Link>
            </div>
        </div>
        </>
    );
};

export default Header;