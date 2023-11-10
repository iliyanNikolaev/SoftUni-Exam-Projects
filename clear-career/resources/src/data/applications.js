import { get, post } from './api.js';

const endpoints = {
    apply: '/data/applications',
    apllicationsCount: (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    isApplied: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const applyOffer = async (offerId) => {
    return post(endpoints.apply, { offerId });
}

export const getApplicationsCount = async (offerId) => {
    return get(endpoints.apllicationsCount(offerId));
}

export const isApplied = async (offerId, userId) => {
    return get(endpoints.isApplied(offerId, userId));
}