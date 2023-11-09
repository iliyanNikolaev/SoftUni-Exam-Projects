//TODO... Change user object, if it necessary, according to project requirments
import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export const login = async (email, password) => {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}

export const register = async (email, password) => {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
}

export const logout = () => {
    get(endpoints.logout);
    clearUserData();
}