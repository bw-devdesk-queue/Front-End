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
        case 'LOGIN':
                return { ...state }

        case 'LOADING': 
                return {...state, loading: true}

        default:
                return { ...state, loading: false, user: action.payload }
    }
}