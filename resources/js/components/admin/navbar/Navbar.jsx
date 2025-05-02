import React from "react";

const Navbar = () => {
    return (
        <header className="app-nav flex items-center p-4">
            <div className="logo w-1/4">
            <img src="" alt="Logo" />

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
