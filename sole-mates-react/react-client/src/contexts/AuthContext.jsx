import { createContext, useContext, useState } from "react";
import * as sessionStorage from '../util/sessionStorage';

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

    const ctx = {
        userData
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