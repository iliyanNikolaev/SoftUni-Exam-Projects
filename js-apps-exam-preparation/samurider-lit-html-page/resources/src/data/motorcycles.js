import { get, post, put, del } from "./api.js";

const endpoints = {
    all: '/data/motorcycles?sortBy=_createdOn%20desc',
    motorcycles: '/data/motorcycles',
    byId: '/data/motorcycles/',
    searchByModel: (model) => `/data/motorcycles?where=model%20LIKE%20%22${model}%22`
}

export const getAllMotorcycles = async () => {
    return get(endpoints.all);
}

export const getMotorcycleById = async (id) => {
    return get(endpoints.byId + id);
}

export const searchByModel = async (model) => {
    return get(endpoints.searchByModel(model));
}

export const createMotorcycle = async (data) => {
    return post(endpoints.motorcycles, data);
}

export const editMotorcycleById = async (id, data) => {
    return put(endpoints.byId + id, data);
}


export const deleteMotorcycleById = async (id) => {
    return del(endpoints.byId + id);
}