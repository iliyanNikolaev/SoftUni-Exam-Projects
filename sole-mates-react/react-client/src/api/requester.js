import * as sessionStorage from '../util/sessionStorage';

const host = 'http://localhost:3030';

const request = async (method, url, data) => {
    const options = {
        method,
        headers: {}
    }

    const userData = sessionStorage.getUserData();
    
    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if(data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
        if(!response.ok) {
            if(response.status == 403){ // invalid access token
                sessionStorage.clearUserData();
            }
            const error = await response.json();
            throw error;
        }

        if(response.status == 204) { // no content
            return response;
        }

        return response.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');