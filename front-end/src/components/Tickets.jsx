import React, { useEffect } from 'react';
import Ticket from './Ticket';

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
    <>
      {
        userTicketsTest.map(ticket => {
        return <Ticket data={ticket} key={ticket.id} />})
      }
    </>
  );
}

export default Tickets;