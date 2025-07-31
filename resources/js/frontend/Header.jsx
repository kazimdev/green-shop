import React from "react";
import Logo from "../../images/Logo.png";

const Header = () => {
    return (
        <header className="relative bg-gray-10 py-2">
            <div className="container mx-auto flex items-top justify-between sm:items-center sm:pt-0">
                <div className="logo">
                    <img src={Logo} alt="Logo" width="180" />
                </div>

                <form className="search w-1/3" method="GET">
                    <input
                        type="text"
                        name="shop_search"
                        id="shop_search"
                        placeholder="Search..."
                        className="block border rounded border-gray-300 w-full"
                    />
                </form>

                <div className="hidden px-6 py-4 sm:block">
                    <a
                        href="/dashboard"
                        className="text-sm text-gray-700 underline"
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
