import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import TicketCard from './TicketCard';
import Ticket from './Ticket';
import styled from 'styled-components';
import userTicketsTest from './../testData';

const TicketsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`

const Tickets = () => {
  
  return (
    <>
      <TicketsWrapper>
        {
          userTicketsTest.map(ticket => {
          return <TicketCard data={ticket} key={ticket.id} />})
        }
      </TicketsWrapper>
    </>
  );
}

export default Tickets;