import React, {  useEffect } from 'react';
import TicketCard from './TicketCard';
import styled from 'styled-components';
import StudentTabs from "./StudentTabs";
import AdminTabs from "./AdminTabs"
import { useSelector, useDispatch } from 'react-redux';
import { userTickets, recoverUser , getalltickets} from '../actions/actions';
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
      email:state.user.email,
      tickets: state.user.userTickets
    });
  });

  useEffect( () => {
    state.user.id ? storeUser(state.user) : dispatch(recoverUser(checkForUserRecovery(history)));
    dispatch(userTickets(state.user.id));
  }, [])



 
  return (
    <>
      <TicketsWrapper>
        {history.location.pathname==="/user/tickets"?<StudentTabs/>:<AdminTabs/>}
        {
          state.tickets.sort( (a, b) => Number(a['ticket_id']) - Number(b['ticket_id'])).map(ticket => {
          return <TicketCard email={state.email} data={ticket} key={ticket.id} />})
        }
      </TicketsWrapper>
    </>
  );
}

export default Tickets;