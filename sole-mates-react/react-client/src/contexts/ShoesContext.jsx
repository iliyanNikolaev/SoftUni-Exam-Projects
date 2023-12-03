import { createContext, useContext, useState } from "react";
import * as requester from "../api/requester";

const ShoesContext = createContext();

export const ShoesContextProvider = ({ children }) => {

    const [shoes, setShoes] = useState([]);

    const endpoints = {
        shoes: '/data/shoes?sortBy=_createdOn%20desc',
        create: '/data/shoes',
        byId: '/data/shoes/'
    }

    const getAllShoes = async () => {
        const shoes = await requester.get(endpoints.shoes);
        setShoes(prev => shoes);
    }

    const getShoeById = async (id) => {
        return requester.get(endpoints.byId + id);
    }

    const createShoe = async (data) => {
        const shoe = await requester.post(endpoints.create, data);
        setShoes(prev => [...prev, shoes]);
    }

    const editShoeById = async (id, data) => {
        return requester.put(endpoints.byId + id, data);
    }

    const deleteShoeById = async (id) => {
        await requester.del(endpoints.byId + id);
        setShoes(prev => prev.filter(x => x._id != id));
    }

    const ctx = {
        getAllShoes,
        getShoeById,
        createShoe,
        editShoeById,
        deleteShoeById,
        shoes
    };

    return (
        <ShoesContext.Provider value={ctx}>
            {children}
        </ShoesContext.Provider>
    )
}

export const useShoesContext = () => {
    return useContext(ShoesContext);
} 