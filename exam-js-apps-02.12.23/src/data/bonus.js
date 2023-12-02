import { get, post } from "./api.js";

const endpoints = {
    likeByCharacterId: '/data/useful',
    getLikesByCharacterId: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    isLiked: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export const getLikesByCharacterId = async (characterId) => {
    return get(endpoints.getLikesByCharacterId(characterId));
}

export const isLiked = async (characterId, userId) => {
    return get(endpoints.isLiked(characterId, userId));
}

export const likeByCharacterId = async (data) => {
    return post(endpoints.likeByCharacterId, data);
}

