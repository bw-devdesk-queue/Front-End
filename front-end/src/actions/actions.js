import { axiosWithAuth } from '../utils/utils';


// userData shape = {username, password, role}
export const login = (userData, locationHistory) => dispatch => {
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/login`, userData)
                   .then( res => {
                       console.log(res);
                       dispatch({type: 'LOGIN', payload: res.data}); //hopeful payload shape: name, role, id, userTickets
                       localStorage.setItem('token', res.data.token);
                       locationHistory.push( res.data.role === 'admin' ? '/admin/home' : '/home' );
                   })
                   .catch( err => console.log('AXIOS ERROR: ', err));
}