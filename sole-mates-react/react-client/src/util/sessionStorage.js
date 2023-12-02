export const getUserData = () => JSON.parse(sessionStorage.getItem('userData'));
export const setUserData = (userData) => { sessionStorage.setItem('userData', JSON.stringify(userData)) }
export const clearUserData = () => { sessionStorage.removeItem('userData') }