import React, { useState, useEffect } from 'react';
import {TicketWrapperB, TicketRowB,TicketTitleB, TicketDetailsB,TicketDetailB,TicketHelperB}from "./Styles/StyleWidgets"
import { Link, useRouteMatch } from 'react-router-dom';
import './Styles/Ticket.scss';
import { useDispatch } from 'react-redux';
// import { updateTicket } from '../actions/actions';



// Test data
const loggedInUser = {full_name: "David L White"};


// Ticket shape should be = id, title, submitter, status, helper, description
const TicketCard = ({data, name}) => {
 
  // Ticket state
  const dispatch = useDispatch();
  //use of useDispatch to update ticket
  // dispatch(updateTicket(ticket.ticket_id, ticketData))
  const ticket = data ? data : [];
  const [ticketData, setTicketData] = useState(ticket);
 
  useEffect( () => {
    // dispatch(updateTicket(ticketData, ticket.ticket_id));
    
  }, [ticketData.helper])
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const isHelped = ticket.helper?.length > 0;
  const derivedClass = isAdmin ? (isHelped ? 'details-helped' : 'details-nothelped') : 'details-user';
  const noTicketHelperMsg = isAdmin ? 'Help Student' : `Helper: ${ticket.helper}`;
  const ticketHelperDetail = isHelped ? `Helper: ${ticket.helper}` : noTicketHelperMsg;

  // Click handler for the TicketHelper component
  const handleClick = () => {
    if (isAdmin && !isHelped) {
      setTicketData({...ticketData, helper: loggedInUser.full_name});
    }
  }


  return (
    <TicketWrapperB>
    <Link to={`/${rolePath}/tickets/${ticket.ticket_id}`}>
      <TicketRowB>
        <TicketTitleB>{ticket.title}</TicketTitleB>
      </TicketRowB>
    </Link>
      <TicketRowB>
        <TicketDetailsB>
          <TicketDetailB>Id: {ticket.ticket_id}</TicketDetailB>
          <TicketDetailB>Submitter: {name}</TicketDetailB>
          <TicketDetailB>Status: {ticket.completed===true? "solved":"needs to resolve"}</TicketDetailB>
          <TicketHelperB className={derivedClass} onClick={handleClick}>{ticketHelperDetail}</TicketHelperB>
        </TicketDetailsB>
      </TicketRowB>
    </TicketWrapperB>
  );
}

export default TicketCard;