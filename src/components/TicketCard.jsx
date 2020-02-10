import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import './Styles/Ticket.scss';
import Modal from 'react-animated-modal';

// Redux state
import { useSelector, useDispatch } from 'react-redux';
import { updateTicket } from '../actions/actions';
import { axiosWithAuth } from './../utils/utils';

// Test data
const loggedInUser = {full_name: "David L White"};

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-top: 1%;
  margin-bottom: 1%;
  border-radius: 5px;
  border: 1.5px solid black;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 60%;
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.4s ease;
    background-color: lightgray;
    border: 1.5px solid #333;
  }

`

const TicketRow = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid darkgray;
  border-radius: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &:last-child {
    border-bottom: 0;
  }
`

const TicketTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
`
// At the breakpoint, the ticket details display in a column
// This helps simplify responsiveness for the component
// This necesitated style changes to border, color and background
const TicketDetails = styled.div`
  display: flex;
  background-color: #f1eeee;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const TicketDetail = styled.p`
  margin: 2%;
  border: 1px solid gold;
  overflow: hidden;
  white-space: nowrap;
  background: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;

  @media (max-width: 1200px) {
    margin: 0;
    padding: 0.5rem 0.5rem;
    max-width: 100%;
    border-top: 0;
    border-left: 1px solid black; 
    border-right: 1px solid black;
    border-bottom: 1px solid gray;
    border-radius: 0;
    background-color: #f1eeee;
    color: black;

    &:first-child {
      border-top: 1px solid gray;
    }
  }

`

const TicketAssignedTo = styled.p`
  margin: 2%;
  border: 1px solid #333;
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem;
  border-radius: 5px;

  @media (max-width: 1200px) {
    margin: 0;
    padding: 0.5rem 0.5rem;
    max-width: 100%;
    border-left: 1px solid black; 
    border-right: 1px solid black;
    border-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

// Ticket shape should be = id, title, submitter, status, helper, description
const TicketCard = ({data, email}) => {
  // State hook for local data
  const ticket = data ? data : [];
  const [ticketData, setTicketData] = useState(ticket);
  const [showModal, setShowModal] = useState(false);

  // Redux state
  const dispatch = useDispatch();
  //use of useDispatch to update ticket
  // dispatch(updateTicket(ticket.ticket_id, ticketData))
 
  useEffect( () => {
    dispatch(updateTicket(ticketData, ticket.ticket_id));
  }, [ticketData.assigned_to])
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const isAssigned = ticket.assigned_to?.length > 0;
  const derivedClass = isAdmin ? (isAssigned ? 'details-helped' : 'details-nothelped') : 'details-user';
  const noTicketAssignedToMsg = isAdmin ? 'Help Student' : `Helper: ${ticket.assigned_to}`;
  const ticketAssignedToDetail = isAssigned ? `Helper: ${ticket.assigned_to}` : noTicketAssignedToMsg;

  // // Click handler for the TicketAssignedTo component
  // const handleClick = () => {
  //   if (isAdmin && !isAssigned) {
  //     // Grab the user id from the state object and match it to the id of the correct user in allUsers
  //     setTicketData({...ticketData, assigned_to: allUsers.filter(user => String(user.id) === String(userState.user.id))?.full_name});
  //   }
  // }

  // Click handler for the TicketAssignedTo component
  const handleClick = () => {
    if (isAdmin && !isAssigned) {
      setTicketData({...ticketData, assigned_to: 1});
    }
  }

  return (
    <>
    <TicketWrapper>
    {/* <Link to={`/${rolePath}/tickets/${ticket.ticket_id}`}></Link> */}
      <TicketRow>
        <TicketTitle>{ticket.title}</TicketTitle>
      </TicketRow>
      <TicketRow>
        <TicketDetails>
          <TicketDetail>Id: {ticket.ticket_id}</TicketDetail>
          <TicketDetail>Submitter: {email}</TicketDetail>
          <TicketDetail>Status: {ticket.completed===true? "solved":"needs to resolve"}</TicketDetail>
          <TicketAssignedTo className={derivedClass} onClick={handleClick}>{ticketAssignedToDetail}</TicketAssignedTo>
        </TicketDetails>
      </TicketRow>
    </TicketWrapper>
    <div>
      <Modal
          visible={showModal}
          closemodal={() => setShowModal(false)}
          type="flipInX"
      >
        Here
      </Modal>
      <div onClick={() => setShowModal(true)}>
          Open Modal
      </div>
    </div>
    </>
  );
}

export default TicketCard;
