const intialState = {
    user: {
        id: '',
        role: '',
        name: '',
        userTickets: []
    },
    allTickets: [],
    loading: false

}



export const devDeskReducer = (state = intialState, action) => {
    switch( action.type ){
        case 'LOADING': 
                return {...state, loading: true}

        case 'REGISTER':
            return{
                ...state,
                user:action.payload,
                loading:false
            }        
        case 'LOGIN':
                return { ...state, loading: false,  user: {
                    id: action.payload.userId,
                    name: action.payload.full_name,
                    email: action.payload.email,
                    role: action.payload.role,
                    userTickets: action.payload.userTickets || []
                }
            }
        
        case 'UPDATE_TICKETS':
                return {...state, loading: false, user: { ...state.user, tickets: action.payload.map(ticket => ticket.ticket_id)}};

        case 'RECOVER_USER_FROM_LOCAL':
                return {...state, user: {...action.payload}}

        default:
                return { ...state, loading: false }
    }
}