import { axiosWithAuth } from '../utils/utils';


// userData shape = {username, password, role}
export const login = userData => dispatch => {
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/login`, {username: userData.username, userData: userData.password})
                   .then( res => {
                       console.log(res);
                       dispatch({type: 'LOGIN', payload: res.data}) //hopeful payload shape: name, role, id, userTickets
                   })
                   .catch( err => console.log('AXIOS ERROR: ', err));
}