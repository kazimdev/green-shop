// components/LogoutButton.tsx
import axios from "./axios";

const LogoutButton = () => {

    const handleLogout = async () => {
        console.log("testing..");
        try {
            await axios.post("/logout");

            window.location.href = '/login';

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
