import axios from 'axios';

export const axiosWithAuth = () => axios.create({
    baseURL: 'https://devdeskbe.herokuapp.com',
    headers: {
        authorization: localStorage.getItem('token')
    }
});


export const getRole = urlParams => {
    return urlParams.match(/admin/) ? 'admin' : 'user';
}

export const toggleRoleType = ( role, history ) => {
    const path = history.location.pathname.split('/')[1];
    const oppositeRole = role === 'admin' ? 'user' : 'admin';
    history.push(`/${path}/${oppositeRole}`);
}

export const storeUser = userData => {
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
}

export const checkForUserRecovery = ( history ) => {
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
    }else{
        localStorage.removeItem('token');
        history.push('/login/user');
    }
}

export const flushStorage = () => ['token', 'user'].forEach( key => localStorage.removeItem(`${key}`));