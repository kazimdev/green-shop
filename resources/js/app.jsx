import "../css/app.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Navbar from "./admin/navbar/Navbar";
import Sidebar from "./admin/sidebar/Sidebar";
import MainContent from "./admin/main/MainContent";
import Header from "./frontend/Header";
import Footer from "./frontend/Footer";
import FeaturedProducts from "./frontend/shop/FeaturedProducts";

const App = () => {
    return (
        <>
            <Header></Header>

            <FeaturedProducts></FeaturedProducts>

            <div className="flex justify-center items-center max-w-6xl mx-auto min-h-[80vh] sm:px-6 lg:px-8 sm:py-8 lg:py-16">
                <div className="w-1/2">
                    <h1 className="text-4xl uppercase mb-3">
                        Shop With Confidence
                    </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Necessitatibus labore sequi nesciunt culpa aperiam
                        quasi dolor odit cumque quibusdam reprehenderit tempore
                        id minima accusamus, praesentium rerum vero tenetur
                        numquam eligendi.
                    </p>

                    <a
                        href="/shop"
                        className="inline-block mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                    >
                        Shop Now
                    </a>
                </div>

                <div className="w-1/2">
                    <img
                        src="https://picsum.photos/600/600"
                        alt=""
                        srcSet=""
                        width="600"
                        className="mx-auto rounded-lg"
                    />
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

const siteRoot = document.getElementById("site-root");

if (siteRoot) {
    const root = createRoot(siteRoot);
    root.render(<App />);
}

const AppAdmin = () => {
    return (
        <>
            <Router>
                <Navbar></Navbar>
                <div className="app-body flex justify-between gap-4 h-screen">
                    <Sidebar></Sidebar>
                    <MainContent></MainContent>
                </div>
            </Router>
        </>
    );
};

const dashboardRoot = document.getElementById("app-dashboard");

if (dashboardRoot) {
    const root = createRoot(dashboardRoot);
    root.render(<AppAdmin />);
}
