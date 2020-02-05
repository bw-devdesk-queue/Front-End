const intialState = {
    allTickets: [],
    loading: false,
    user: {
        id: '',
        role: '',
        name: '',
        userTickets: []
    }
}


export const devDeskReducer = (state = intialState, action) => {

    switch( action.type ){
        case 'LOADING': 
                return {
                    ...state, 
                    loading: true
                }

        case 'REGISTER':
            return{
                ...state,
                loading:false,
                user: {
                    id: action.payload.userId,
                    name: action.payload.full_name,
                    email: action.payload.email,
                    role: action.payload.role,
                    
                }
                
            }  
  
        case 'USER_PAGE':
                return { ...state, loading: false, 
                     user: {
                    name: action.payload.full_name,
                    userTickets: action.payload.tickets|| []
                }
            }

        case 'GET_TICKETS':
            return{
                ...state,
                user: {
                    id: action.payload.userId,
                    name: action.payload.full_name,
                    email: action.payload.email,
                    role: action.payload.role,
                    userTickets: action.payload.userTickets || []
                }
            }
        
        case 'UPDATE_TICKETS':
                return {...state, loading: false, user: { ...state.user, tickets: action.payload.map(ticket => ticket.ticket_id)}};

        case 'ADD_TICKET':
            return{
                ...state,
                user:{
                    userTickets: [...state.user.userTickets, action.payload] || state.user.userTickets
                }
            }
   

        case 'RECOVER_USER_FROM_LOCAL':
                return {
                    ...state, 
                    user: {...action.payload}
                }

        default:
                return {
                     ...state, 
                     loading: false 
                    }
    }
}