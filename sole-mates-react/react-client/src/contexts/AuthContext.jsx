import { createContext, useContext, useState } from "react";
import * as sessionStorage from '../util/sessionStorage';
import * as requester from "../api/requester";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {

        const stateInSessionStorage = sessionStorage.getUserData();

        if (stateInSessionStorage) {
            return {
                isAuthenticated: true,
                ...stateInSessionStorage
            }
        }

        return {
            isAuthenticated: false
        }
    });

    const endpoints = {
        login: '/users/login',
        register: '/users/register',
        logout: '/users/logout',
    }

    const login = async (email, password) => {
        const result = await requester.post(endpoints.login, { email, password });
        sessionStorage.setUserData(result);
        setUserData(prev => ({ isAuthenticated: true, ...result }));
    }

    const register = async (email, password) => {
        const result = await requester.post(endpoints.register, { email, password });
        sessionStorage.setUserData(result);
        setUserData(prev => ({ isAuthenticated: true, ...result }));
    }

    const logout = () => {
        requester.get(endpoints.logout);
        sessionStorage.clearUserData();
        setUserData(prev => ({ isAuthenticated: false }));
    }

    const ctx = {
        userData,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}