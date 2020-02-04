import React, { useState, useEffect } from 'react';
import { getTickets, recoverUser } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getRole, checkForUserRecovery, storeUser } from '../utils/utils';

import Tickets from './Tickets';

const Home = props => {
    const [someState, setSomeState] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    const userState = useSelector( state => {
        return {
            user: state.user
        }
    } );

    userState.user.id ? storeUser(userState.user) : dispatch(recoverUser(checkForUserRecovery(history)));

    const role = getRole(history.location.pathname);

    useEffect(() => {
        if(userState.user.id) dispatch(getTickets(userState.user.id));
        else {
          dispatch(recoverUser(checkForUserRecovery(history)));
        }
        
    }, [ userState.user.id, dispatch ]);

    return (
        <>
            <h1>{`${userState.user.name ? userState.user.name : userState.user.email}`}'s Help Channel</h1>
            <h3>Role: {`${userState.user.role}`}</h3>
            {userState.user &&  <Tickets /> }
        </>
    );
}


export default Home;