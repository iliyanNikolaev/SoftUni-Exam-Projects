import { get, post } from "./api.js";

const endpoints = {
    getCountByEventId: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    goToEvent: '/data/going',
    isGoing: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export const getCountOfGoings = async (eventId) => {
    return get(endpoints.getCountByEventId(eventId));
}

export const isGoing = async (eventId, userId) => {
    return get(endpoints.isGoing(eventId, userId));
}

export const goToEvent = async (eventId) => {
    return post(endpoints.goToEvent, { eventId });
}
