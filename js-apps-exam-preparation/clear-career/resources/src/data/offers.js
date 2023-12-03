import { get, post, put, del } from "./api.js";

const endpoints = {
    offers: '/data/offers?sortBy=_createdOn%20desc',
    create: '/data/offers',
    byId: '/data/offers/'
}

export const getAllOffers = async () => {
    return get(endpoints.offers);
}

export const getOfferById = async (id) => {
    return get(endpoints.byId + id);
}

export const createOffer = async (data) => {
    return post(endpoints.create, data);
}

export const editOfferById = async (id, data) => {
    return put(endpoints.byId + id, data);
}

export const deleteOfferById = async (id) => {
    return del(endpoints.byId + id);
}