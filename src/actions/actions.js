import { axiosWithAuth, storeUser } from '../utils/utils';




export const authIn = (userData, locationHistory) => dispatch => {
    const authType = locationHistory.location.pathname.match(/login/) ? 'login' : 'register';
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/${authType}`, userData)
                   .then( async res => {
                    //    console.log('AUTH ATTEMPT DATA: ', res);
                        //    WORK AROUND FOR MISRETURNED DATA FROM BACKEND
                        res.data?.token ? localStorage.setItem('token', res.data?.token) : localStorage.setItem('token', res.data?.user?.token);
                        const {email, role, userTickets} = await res.data?.user;
                        // this is a work-around for mis-shaped data on return
                        const id = await res.data.user.id ? res.data.user.id : res.data.user.userId;
                        const name = await res.data.user.full_name;
                        storeUser({id, name, email, role, userTickets});
                        const userData = await dispatch({type: 'LOGIN', payload: {id, email, role, userTickets}});
                        const user = res.data.user ? res.data.user : res.data.data.user;
                        locationHistory.push( user.role === 'admin' ? '/admin/tickets' : '/user/tickets' ); //`/home/user/${user.userId}`);

                     //hopeful payload shape: name, role, id, userTickets
                       //locationHistory.push(`/home/user/${res.data.user.userId}`);
                       //locationHistory.push( res.data.user.role === 'admin' ? '/home/admin' : '/home/user' );
                   })
                   .catch( err => console.log('AXIOS ERROR: ', err));
}


export const getTickets = userID => dispatch => {
    axiosWithAuth().get(`/api/tickets/${userID}`)
                   .then(res => {
                     
                     const currentUser = JSON.parse( localStorage.getItem('user') );
                     localStorage.setItem('user', JSON.stringify({...currentUser, userTickets: res.data.tickets}));
                     dispatch({type: 'UPDATE_TICKETS', payload: res.data.tickets});
                   })
                   .catch(err => console.log('Axios Error: ', err))

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

export const addticket=(ticket,id,history)=>dispatch=>{
    axiosWithAuth().post(`/api/tickets/${id}`,ticket)
    
    .then(res=>{
        console.log(res)
        dispatch({type:"ADD_TICKET", payload:res.data.ticket})
        history.push(`/home/user/${id}`)
    })
    .catch(err=>{
        console.log(err)
    })
}


export const updateTicket=(ticket,id)=>dispatch=>{
    axiosWithAuth().put(`/api/tickets/${id}`, ticket)
    .then(res => {
        console.log(res)
        dispatch({type:"UPDATE_TICKET", payload:res.data.ticket});
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getoneticket=(id)=>dispatch=>{
    axiosWithAuth().get(`/api/tickets/${id}`)
    .then(res=>{
        console.log(res)
    })
}