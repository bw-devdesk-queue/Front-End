import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
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
`

const TicketTitle = styled.h3`
  margin-left: 2%;
`

const TicketDetails = styled.div`
  display: flex;
  background-color: #f1eeee;
  width: 100%;
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
const TicketCard = ({data}) => {
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
      </TicketRow>
      <TicketRow>
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

export default TicketCard;