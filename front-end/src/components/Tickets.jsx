import React, { useEffect } from 'react';
import Ticket from './Ticket';

const userTicketsTest = [
  {
    id: "1", 
    title: "Test 1", 
    submitter: "David", 
    status: "unresolved", 
    helper: "",
    description: "This is a great ticket"
  },
  {
    id: "2", 
    title: "Test 2", 
    submitter: "Josh", 
    status: "unresolved", 
    helper: "",
    description: "This is a great ticket"
  },
  {
    id: "3", 
    title: "Test 3", 
    submitter: "Ramy", 
    status: "unresolved", 
    helper: "",
    description: "This is a great ticket"
  },
  {
    id: "4", 
    title: "Test 4", 
    submitter: "Jarvis", 
    status: "unresolved", 
    helper: "",
    description: "This is a great ticket"
  }
];

const Tickets = () => {
  
  return (
    <>
      {
        userTicketsTest.map(ticket => {
        return <Ticket data={ticket} />})
      }
    </>
  );
}

export default Tickets;