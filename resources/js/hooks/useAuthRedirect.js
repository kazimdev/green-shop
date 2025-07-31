import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../auth/axios";

/**
 * useAuthRedirect - React hook to check authentication on mount and redirect to login if not authenticated.
 * Usage: Call useAuthRedirect() at the top of any protected component.
 */
const useAuthRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("/api/user"); // expects 200 if authenticated
            } catch (err) {
                if (
                    err.response &&
                    (err.response.status === 401 || err.response.status === 419)
                ) {
                    navigate("/login");
                    window.location.reload();
                }
            }
        };
        checkAuth();
        // Only run on mount
        // eslint-disable-next-line
    }, []);
};

export default useAuthRedirect;
