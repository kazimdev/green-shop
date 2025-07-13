import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";

const Sidebar = () => {
    const location = useLocation();
    const activePath = location.pathname;

    const activeClasses = "flex gap-2 items-center p-3 mb-2 active";
    const inactiveClasses = "flex gap-2 items-center p-3 mb-2";

    // check if the current path includes the given path

    const isActive = (path) => activePath === path || (path != "/dashboard" && activePath.startsWith(path));

    const pointer = (
        <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-info animate-ping"></div>
            <div className="status status-info"></div>
        </div>
    );

    const routes = {
        "/dashboard": "Dashboard",
        "/dashboard/products": "Products",
        "/dashboard/categories": "Categories",
        "/dashboard/orders": "Orders",
        "/dashboard/customers": "Customers",
        "/dashboard/users": "Our staffs",
        "/dashboard/settings": "Settings",
    };

    const routeLinks = Object.keys(routes).map((route) => {
        return (
            <li key={route}>
                <Link
                    to={route}
                    className={
                        isActive(route) ? activeClasses : inactiveClasses
                    }
                >
                    {isActive(route) && pointer} {routes[route]}
                </Link>
            </li>
        );
    });

    // Render the sidebar with the links
    return (
        <div className="sidebar w-1/6 bg-[#2f4858] p-4">
            <ul>
                {routeLinks}

                <li>
                    <a
                        href="/"
                        target="_blank"
                        className="flex gap
                    -2 items-center p-3 mb-2"
                    >
                        View Site
                    </a>
                </li>

                <li>
                    <LogoutButton></LogoutButton>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
