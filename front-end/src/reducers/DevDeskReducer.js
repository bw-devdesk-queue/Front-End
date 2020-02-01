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
                return { ...state }

        

        default:
                return { ...state, loading: false, user: action.payload }
    }
}