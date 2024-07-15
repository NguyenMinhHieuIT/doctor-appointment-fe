export const setUserInfo = ({accessToken, userId}) =>{
    userId && setLocalStorage('userId',userId);
    return setLocalStorage('accessToken',accessToken);
}

export const setLocalStorage = (key, token) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    return localStorage.setItem(key, token)
}

export const getFromLocalStorage = (key) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    return localStorage.getItem(key)
}