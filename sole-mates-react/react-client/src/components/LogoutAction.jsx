import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const LogoutAction = () => {
    const { logout } = useAuthContext();

    useEffect(() => {
        logout();
    }, []);

    return <Navigate to='/' />
}
