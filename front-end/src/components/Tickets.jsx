import React, { useEffect } from 'react';
import TicketCard from './TicketCard';
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
    title: "Test 1", 
    submitter: "David", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "2", 
    title: "Test 2", 
    submitter: "Josh", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "3", 
    title: "Test 3", 
    submitter: "Ramy", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  },
  {
    id: "4", 
    title: "Test 4", 
    submitter: "Jarvis", 
    status: "unresolved", 
    helper: "",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nobis saepe atque quo accusantium, repudiandae eius cumque minus, dignissimos eveniet impedit adipisci! Officia recusandae sit explicabo corrupti mollitia qui tempore?"
  }
];

const Tickets = () => {
  
  return (
    <TicketsWrapper>
      {
        userTicketsTest.map(ticket => {
        return <TicketCard data={ticket} key={ticket.id} />})
      }
    </TicketsWrapper>
  );
}

export default Tickets;