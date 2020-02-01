import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';

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
`

const TicketTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
`

const TicketDetails = styled.div`
  display: flex;
  background-color: #f1eeee;
  width: 100%;

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

const TicketResolution = styled.p`
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
    border-bottom: 1px solid black;
    border-radius: 0;
  }
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
  const isHelped = data.helper.length > 0;
  const derivedClass = isAdmin ? (isHelped ? 'details-resolved' : 'details-unresolved') : 'details-user';
  const noTicketHelperMsg = isAdmin ? 'Add This Ticket' : `Helper: ${data.helper}`;
  const ticketHelperDetail = isHelped ? `Helper: ${data.helper}` : noTicketHelperMsg;

  return (
    <TicketWrapper>
    <Link to={`/${rolePath}/tickets/${data.id}`}>
        <TicketRow>
          <TicketTitle>{data.title}</TicketTitle>
        </TicketRow>
        <TicketRow>
          <TicketDetails>
            <TicketDetail>Id: {data.id}</TicketDetail>
            <TicketDetail>Submitter: {data.submitter}</TicketDetail>
            <TicketDetail>Status: {data.status}</TicketDetail>
            <TicketResolution className={derivedClass}>{ticketHelperDetail}</TicketResolution>
          </TicketDetails>
        </TicketRow>
      </Link>
    </TicketWrapper>
  );
}

export default TicketCard;