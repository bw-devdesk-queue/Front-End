import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TicketCard from './TicketCard';
import styled from 'styled-components';
import testTickets from './../testData';

const TicketsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`

const Tickets = ({data}) => {
  const tickets = testTickets;
  return (
    <>
      <TicketsWrapper>
        {
          tickets.map(ticket => {
          return <TicketCard data={ticket} key={ticket.id} />})
        }
      </TicketsWrapper>
    </>
  );
}

export default Tickets;