import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TicketCard from './TicketCard';
import Ticket from './Ticketc';
import styled from 'styled-components';
import userTicketsTest from './../testData';

import testTickets from '../testData';

const TicketsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`

const Tickets = ({data}) => {
  const tickets = testTickets; //useSelector(state => state.user.userTickets);
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