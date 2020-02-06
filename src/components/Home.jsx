import React, { useState, useEffect } from 'react';
import { userTickets, recoverUser } from '../actions/actions';
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

    const role = getRole(history.location.pathname);

    useEffect(() => {
        userState.user.id ? storeUser(userState.user) : dispatch(recoverUser(checkForUserRecovery(history)));
        dispatch(userTickets(userState.user.id));
    }, [ userState, dispatch ])


    return (
        <>
            <h1>{`${userState.user.name ? userState.user.name : userState.user.email}`}'s Help Channel</h1>
            <h3>Role: {`${userState.user.role}`}</h3>
            {userState.user &&  <Tickets /> }
        </>
    );
}


export default Home;