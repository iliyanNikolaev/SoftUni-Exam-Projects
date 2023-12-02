import { useEffect } from "react"
import { Navigate } from "react-router-dom";

export const LogoutAction = () => {

    useEffect(() => {
        console.log('logout')
    }, []);

    return <Navigate to='/' />
}
