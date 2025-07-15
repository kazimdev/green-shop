import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./users/Users";
import AddUser from "./users/AddUser";
import Products from "./products/Products";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import Categories from "./categories/Categories";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const MainContent = () => {
    useAuthRedirect();

    return (
        <div className="main-content p-4 text-primary w-5/6">
            <Routes>
                <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                <Route
                    path="/dashboard/products"
                    element={<Products></Products>}
                />
                <Route
                    path="/dashboard/products/add"
                    element={<AddProduct></AddProduct>}
                />
                <Route
                    path="/dashboard/products/edit/:id"
                    element={<EditProduct></EditProduct>}
                />
                <Route
                    path="/dashboard/categories"
                    element={<Categories></Categories>}
                />

                {/* Users */}
                <Route
                    path="/dashboard/users"
                    element={<Users></Users>}
                ></Route>
                <Route
                    path="/dashboard/users/add"
                    element={<AddUser></AddUser>}
                ></Route>
            </Routes>
        </div>
    );
};

export default MainContent;
