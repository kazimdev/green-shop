import '../css/app.css';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Navbar from "./components/admin/navbar/Navbar";
import Sidebar from "./components/admin/sidebar/Sidebar";
import MainContent from "./components/admin/main/MainContent";

const App = () => {
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

const rootElement = document.getElementById("app-dashboard");

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
