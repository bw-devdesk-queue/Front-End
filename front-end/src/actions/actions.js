import { axiosWithAuth, storeUser } from '../utils/utils';



export const authIn = (userData, locationHistory) => dispatch => {
    const authType = locationHistory.location.pathname.match(/login/) ? 'login' : 'register';
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/${authType}`, userData)
                   .then( async res => {
                       console.log('AUTH ATTEMPT DATA: ', res);
                        //    WORK AROUND FOR MISRETURNED DATA FROM BACKEND
                        const user = res.data.user ? res.data.user : res.data.data.user;
                       res.data.token ? localStorage.setItem('token', res.data.token) : localStorage.setItem('token', user.token);
                       locationHistory.push( user.role === 'admin' ? '/home/admin' : `/home/user/${user.userId}` );
                   })
                   .catch( err => console.log('AXIOS ERROR: ', err));
}




export const recoverUser = user => dispatch => {
    dispatch({type: "RECOVER_USER_FROM_LOCAL", payload: user});
}


export const userTickets = (id) => dispatch => {
    axiosWithAuth().get(`/api/tickets/${id}`)
    .then(res=>{
        console.log(res)
        dispatch({type:"USER_PAGE", payload:res.data.data})
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addticket=(ticket,id)=>dispatch=>{
    axiosWithAuth().post(`/api/tickets/${id}`,ticket)
    .then(res=>{
        console.log(res)
        dispatch({type:"ADD_TICKET", payload:res.data.ticket})
    })
    .catch(err=>{
        console.log(err)
    })
}