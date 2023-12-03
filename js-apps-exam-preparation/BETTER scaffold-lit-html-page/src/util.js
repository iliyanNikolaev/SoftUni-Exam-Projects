const itemName = 'userData';

export const getUserData = () => JSON.parse(sessionStorage.getItem(itemName));
export const setUserData = (userData) => { sessionStorage.setItem(itemName, JSON.stringify(userData)) }
export const clearUserData = () => { sessionStorage.removeItem(itemName) }
export const createSubmitHandler = (callback) => (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    return callback(data, form);
}