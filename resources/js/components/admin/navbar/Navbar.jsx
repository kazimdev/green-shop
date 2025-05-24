import React from "react";

import Logo from "../../../../images/Logo.png";

const Navbar = () => {
    return (
        <header className="app-nav flex items-center px-4 py-2">
            <div className="logo w-1/4">
            <img src={Logo} alt="Logo" width="180" />

            </div>
            <nav className="w-3/4">
                <ul>
                    <li> Home </li>
                    <li> English </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
