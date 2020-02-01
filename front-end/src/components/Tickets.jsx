import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import TicketCard from './TicketCard';
import Ticket from './Ticket';
import styled from 'styled-components';

const TicketsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`

const userTicketsTest = [
  {
    id: "1", 
    title: "Unable to push to Lambda repo", 
    submitter: "David L White", 
    status: "unresolved", 
    helper: "Miguel Torres",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "2", 
    title: "Fix version 3.2 compatibility issues with jQuery plugin in Chrome", 
    submitter: "Josh", 
    status: "unresolved", 
    helper: "Shelbie",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "3", 
    title: "Mobile styles not fully responsive at <350px", 
    submitter: "Ramy", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "4", 
    title: "Fix broken URL on Lambda.com sitemap", 
    submitter: "Jarvis", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  }
];

const Tickets = () => {
  
  return (
    <>
      <TicketsWrapper>
        {
          userTicketsTest.map(ticket => {
          return <TicketCard data={ticket} key={ticket.id} />})
        }
      </TicketsWrapper>
      <Ticket data={userTicketsTest[0]} />
    </>
  );
}

export default Tickets;