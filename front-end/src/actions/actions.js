import { axiosWithAuth, storeUser } from '../utils/utils';


// userData shape = {username, password, role}

export const authIn = (userData, locationHistory) => dispatch => {
    const authType = locationHistory.location.pathname.match(/login/) ? 'login' : 'register';
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/${authType}`, userData)
                   .then( async res => {
                       console.log(res.data);
                       //Work around for mis-shaped data on return
                       res.data.token ? localStorage.setItem('token', res.data.token) : localStorage.setItem('token', res.data.user.token);
                       const {email, role, userTickets} = await res.data.user;
                       // this is a work-around for mis-shaped data on return
                       const id = await res.data.user.id ? res.data.user.id : res.data.user.userId;
                       const name = await res.data.user.full_name;
                      //  end workaround
                       storeUser({id, name, email, role, userTickets});
                       dispatch({type: 'LOGIN', payload: {id, email, role, userTickets}}); //hopeful payload shape: name, role, id, userTickets
                       //locationHistory.push(`/home/user/${res.data.user.userId}`);
                       locationHistory.push( res.data.user.role === 'admin' ? '/home/admin' : '/home/user' );
                   })
                   .catch( err => console.log('AXIOS ERROR: ', err));
}


export const getTickets = userID => dispatch => {
    axiosWithAuth().get(`/api/tickets/${userID}`)
                   .then(res => {
                     console.log('*****: ', res.data)
                     const currentUser = JSON.parse( localStorage.getItem('user') );
                     localStorage.setItem('user', JSON.stringify({...currentUser, userTickets: res.data.tickets}));
                     dispatch({type: 'UPDATE_TICKETS', payload: res.data.tickets});
                   })
                   .catch(err => console.log('Axios Error: ', err))

}


export const recoverUser = user => dispatch => {
    dispatch({type: "RECOVER_USER_FROM_LOCAL", payload: user});
}