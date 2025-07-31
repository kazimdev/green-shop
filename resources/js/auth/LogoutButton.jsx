import axios from "./axios";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/api/logout");

            // Remove any local storage/session storage tokens if used
            // localStorage.removeItem('token');

            // Redirect using react-router if available, fallback to window.location
            window.location.replace("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger py-3 block">
            Logout
        </button>
    );
};

export default LogoutButton;
