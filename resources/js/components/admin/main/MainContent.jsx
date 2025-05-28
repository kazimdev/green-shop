import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Categories from "./categories/Categories";

const MainContent = () => {
    return (
        <div className="main-content w-4/5 p-4">
            <Routes>
                <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                 <Route path="/dashboard/products" element={<Products></Products>} />
                 <Route path="/dashboard/categories" element={<Categories></Categories>} />
            </Routes>
        </div>
    );
};

export default MainContent;
