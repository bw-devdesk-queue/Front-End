import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import Ticket from './Ticket';
import styled from 'styled-components';
import testTickets from './../testData';

import { useSelector, useDispatch } from 'react-redux';
import { userTickets, recoverUser } from '../actions/actions';
import { checkForUserRecovery, storeUser } from '../utils/utils';
import { useHistory } from 'react-router-dom';

const TicketsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`

const Tickets = ({data}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector( state => {
    return ({
      user: state.user,
      tickets: state.user.userTickets
    });
  });

  useEffect( () => {
    state.user.id ? storeUser(state.user) : dispatch(recoverUser(checkForUserRecovery(history)));
    dispatch(userTickets(state.user.id));
  }, [])


  // const tickets = state.tickets;
  console.log(state)
  return (
    <>
      <TicketsWrapper>
        {
          state.tickets.map(ticket => {
          return <TicketCard data={ticket} key={ticket.id} />})
        }
      </TicketsWrapper>
    </>
  );
}

export default Tickets;