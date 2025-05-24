import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";

const MainContent = () => {
    return (
        <div className="main-content w-4/5 p-4">
            <Routes>
                <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                 <Route path="/dashboard/products" element={<Products></Products>} />
            </Routes>
        </div>
    );
};

export default MainContent;
