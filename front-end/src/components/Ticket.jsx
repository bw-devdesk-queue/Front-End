import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';

const TicketWrapper = styled.div`
  display: flex;
  border: 1.5px solid black;
  border-bottom: 0;
  width: 99%;
  margin-left: 0.25%;
  background: whitesmoke;
`

const TicketRow = styled.div`
  display: flex;
  flex-direction: column;
`

const TicketTitle = styled.h2`
  margin-left: 1%;
`

const TicketDesc = styled.div`
  border: 1px solid #333;
  background: #fff;
  margin: 1%;
  width: 95%;
`

const TicketDetails = styled.div`
  display: flex;
  justify-content: center;
`

const TicketDetail = styled.p`
  margin: 2%;
  border: 1px solid gold;
  white-space: nowrap;
  background: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
`

// ticket shape should be = id, title, submitter, status, helper
const Ticket = ({data}) => {
  const [ticketData, setTicketData] = useState({
    id: "", 
    title: "", 
    submitter: "", 
    status: "", 
    helper: "",
    description: ""
  });
  const [resolutionHistory, setResolutionHistory] = useState([]);

  // useEffect(
  //   axiosWithAuth('/', {})
  // )

  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const derivedClass = isAdmin ? 'details-hover' : null;
  const noTicketHelperMsg = isAdmin ? 'Help This Ticket' : `Helper: ${data.helper}`;
  const ticketHelperDetail = data.helper ? `Helper: ${data.helper}` : noTicketHelperMsg;

  return (
    <TicketWrapper>
      <TicketRow>
        <TicketTitle>{data.title}</TicketTitle>
        <TicketDesc className='ticket-body-text'>{data.description}</TicketDesc>
        <TicketDetails>
          <TicketDetail>Id: {data.id}</TicketDetail>
          <TicketDetail>Submitter: {data.submitter}</TicketDetail>
          <TicketDetail>Status: {data.status}</TicketDetail>
          <TicketDetail className={derivedClass}>{ticketHelperDetail}</TicketDetail>
        </TicketDetails>
      </TicketRow>
    </TicketWrapper>
  );
}

export default Ticket;