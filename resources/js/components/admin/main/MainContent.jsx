import { Route, Routes } from "react-router-dom";
import Categories from "./categories/Categories";
import Dashboard from "./Dashboard";
import AddProduct from "./products/AddProduct";
import Products from "./products/Products";
import EditProduct from "./products/EditProduct";
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
            </Routes>
        </div>
    );
};

export default MainContent;
