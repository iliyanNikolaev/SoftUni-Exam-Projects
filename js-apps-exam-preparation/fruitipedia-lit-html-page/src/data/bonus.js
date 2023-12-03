import { get } from "./api.js";

const endpoints = {
    search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
}

export const getItemsByQuery = async (query) => {
    return get(endpoints.search(query));
}