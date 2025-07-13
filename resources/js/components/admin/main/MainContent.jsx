import { Route, Routes } from "react-router-dom";
import Users from "./users/Users";
import Dashboard from "./Dashboard";
import Products from "./products/Products";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import Categories from "./categories/Categories";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const MainContent = () => {
    useAuthRedirect();

    return (
        <div className="main-content w-5/6 p-4 text-primary">
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

                <Route path="/dashboard/users" element={<Users></Users>}></Route>
            </Routes>
        </div>
    );
};

export default MainContent;
