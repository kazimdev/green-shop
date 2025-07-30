import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./users/Users";
import AddUser from "./users/AddUser";
import Products from "./products/Products";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import Categories from "./categories/Categories";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import axios from "../../auth/axios";
import EditUser from "./users/EditUser";
import Orders from "./orders/Orders";

const MainContent = () => {
    useAuthRedirect();

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        axios
            .get("/api/user")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const isAdmin = user && (user.role === "admin" || user.role === "Admin");

    return (
        <div className="main-content p-4 text-primary w-5/6">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Admin-only routes */}
                {isAdmin && (
                    <>
                        <Route
                            path="/dashboard/products"
                            element={<Products />}
                        />
                        <Route
                            path="/dashboard/products/add"
                            element={<AddProduct />}
                        />
                        <Route
                            path="/dashboard/products/edit/:id"
                            element={<EditProduct />}
                        />
                        <Route
                            path="/dashboard/categories"
                            element={<Categories />}
                        />

                        <Route path="/dashboard/orders" element={<Orders />} />

                        <Route path="/dashboard/users" element={<Users />} />
                        <Route
                            path="/dashboard/users/add"
                            element={<AddUser />}
                        />
                        <Route
                            path="/dashboard/users/edit/:id"
                            element={<EditUser />}
                        />
                    </>
                )}

                <Route path="/dashboard/settings" element="" />
            </Routes>
        </div>
    );
};

export default MainContent;
