import { flushStorage } from "../utils/utils"

const initialState = {
    allTickets: [],
    loading: false,
    user: {
        id: '',
        role: '',
        name: '',
        userTickets: [],
        oneTicket:{}
    },
    admin:{
        adminTickets:[]
    }
}


export const devDeskReducer = (state = initialState, action) => {

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
                    userTickets: action.payload.tickets
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
        
        case "GET_ONE_TICKET":
            return{
                ...state,
                loading:false,
                oneTicket:action.payload
            }


        case 'UPDATE_TICKETS':
                console.log("Before reducer updates, tickets currently are:", state.userTickets)
                console.log("Reducer updating all tickets to:", action.payload.map(ticket => ticket.ticket_id))
                return {...state, loading: false, user: { ...state.user, userTickets: action.payload.map(ticket => ticket.ticket_id)}};

        
        case 'UPDATE_TICKET':
                return {...state,  user: { ...state.user, tickets: [ ...state.user.userTickets.filter( ticket => ticket?.ticket_id !== action.payload?.ticket_id), action.payload ]}}

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
        
        case 'LOGOUT': 
                flushStorage();
                return {
                    ...initialState
                }

        default:
                return {
                     ...state, 
                     loading: false 
                    }
    }
}