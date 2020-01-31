import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './Styles/Ticket.scss';

const TicketWrapper = styled.div`
  display: flex;
  width 100%;
  border: 1px solid black;
`

const TicketRow = styled.div`
  display: flex;
  flex-direction: columnn;
  justify-content: center;
  align-items: center;
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

  return (
    <TicketWrapper>
      <TicketRow>
        <section>
          <h2>{data.title}</h2>
          <div class='ticket-body'>
            <p>Id: {data.id}</p>
            <p>Submitter: {data.submitter}</p>
            <p>Status: {data.status}</p>
            <p>Helper: {data.helper}</p>
            <p class='ticket-body-text scrollable'>data.description</p>
          </div>
        </section>
      </TicketRow>
    </TicketWrapper>
  );
}

export default Ticket;