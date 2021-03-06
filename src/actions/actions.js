import { axiosWithAuth, storeUser, flushStorage } from '../utils/utils';
import axios from 'axios';



export const authIn = (userData, locationHistory) => dispatch => {
    flushStorage();
    const authType = locationHistory.location.pathname.match(/login/) ? 'login' : 'register';
    dispatch({type: 'LOADING'});

    axiosWithAuth().post(`/auth/${userData.role}/${authType}`, userData)
                   .then( res => {
                    //    console.log('AUTH ATTEMPT DATA: ', res);

                    // ANOTHER WORKAROUND FOR POOR BACKEND
                        if(res.data.admin){
                            localStorage.setItem('token', res.data.token);
                            const id = res.data.admin.id;

                            axiosWithAuth().get('/auth/admin')
                                           .then( res => {

                                               const thisAdmin = res.data.admin.find( admin => admin.id === id);
                                               
                                                axiosWithAuth().get('/api/tickets')
                                                               .then( res => {
                                                                   thisAdmin.userTickets = res.data.tickets;
                                                                   const { name, email, userTickets } = thisAdmin;
                                                                   const role = 'admin';
                                                                   dispatch({type: 'LOGIN', payload: {id, name, email, role, userTickets}});
                                                                   storeUser({id, name, email, role, userTickets});
                                                                   locationHistory.push('/admin/tickets');
                                                                   return
                                                               })
                                                               .catch(err => console.log(err))

                                           })
                                           .catch(err => console.log(err))
                        }



                        //    WORK AROUND FOR MISRETURNED DATA FROM BACKEND
                        res.data?.token ? localStorage.setItem('token', res.data?.token) : localStorage.setItem('token', res.data?.user?.token);
                        const {email, role, userTickets} = res.data?.user;
                        // this is a work-around for mis-shaped data on return
                        const id = res.data.user.id ? res.data.user.id : res.data.user.userId;
                        const name = res.data.user.full_name;
                        storeUser({id, name, email, role, userTickets});
                        const userData = dispatch({type: 'LOGIN', payload: {id, email, role, userTickets}});
                        const user = res.data.user ? res.data.user : res.data.data.user;
                     //hopeful payload shape: name, role, id, userTickets
                       locationHistory.push(`/user/tickets`);
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
        
        dispatch({type:"USER_PAGE", payload: res.data.data})
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addticket=(ticket,id,history)=>dispatch=>{
    axiosWithAuth().post(`/api/tickets/${id}`,ticket)
    
    .then(res=>{
        
        dispatch({type:"ADD_TICKET", payload:res.data.ticket})
        history.push(`/home/user/${id}`)
    })
    .catch(err=>{
        console.log(err)
    })
}


export const updateTicket=(ticket,id)=> dispatch =>{
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

export const getalltickets=(id)=>dispatch=>{
    axiosWithAuth().get(`/api/tickets/${id}`)
    .then(res=>{
        console.log(res,"data")
    })
}

export const axiosUpdateTicket = (id, ticket, token) => dispatch => {
    axios({
      method: 'put',
      url: `https:/devdeskbe.herokuapp.com/api/tickets/${id}`,
      headers: {
        authorization: token,
      },
      // data: JSON.stringify(ticket)
      data: {
        "title": "anna has update",
        "submitted_by": "Josh",
        "description": "hwa hahahah",
        "attempted_solution": "Attempted 1|Attempted 2",
        "completed": true
      }
    })
    .then(res => {
      console.log('Update ticket response', res)
      dispatch({type:"UPDATE_TICKET", payload:res.data})
    })
    .catch(err => console.log('Update ticket error:', err))
  }

  export const logout = () => dispatch => {
      flushStorage();
      dispatch({type:'LOGOUT'});
  }