import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';
import { axiosWithAuth } from '../utils/utils';

// Test data
import userTicketsTest from '../testData';
const loggedInUser = {full_name: "David L White"};

/* Styled components
 The component is composed of a wrapper, rows (flex containers), and
 these contain data fields ticket shape

 TicketWrapper
   - TicketRow
     -- TicketTitle
       --- title
     -- TicketDescription
       --- description
     -- TicketDetails
       --- ticket_id, submitter, status, helper
*/

const TicketWrapper = styled.div`
  display: flex;
  background: #fff;
  margin-bottom: 1%;
  margin-left: 1%;
  border-radius: 5px;
  border: 1.5px solid black;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 97.5%;
`

const TicketColumn = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
`

const TicketRow = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid darkgray;
`

// Left hand side
const TicketTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
`

const TicketDescWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid darkgray;
  background-color: lightgray;
`

const TicketDescription = styled.div`
  border-right: 1px solid #333; 
  border-left: 1px solid #333;
  background: #fff;
  margin: 0% 1%;
  width: 95%; 
  overflow-y: scroll;
`

// At the breakpoint, the ticket details display in a column
// This helps simplify responsiveness for the component
// This necesitated style changes to border, color and background
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
  white-space: wrap;
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

const TicketHelper = styled.p`
  margin: 2%;
  border: 1px solid #333;
  white-space: wrap;
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

// Right hand side
const TicketHistoryTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
  font-style: italic;
`

const TicketSolutions = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  border-left: 1px solid black;
  overflow-y: scroll;
  height: 20rem;
  border-bottom: 
`

const TicketSolutionRow = styled.div`
  background: white;
  width: 99.9%;
`

const TicketSolution = styled.p`
  padding: 1%;
  font-size: 1em;
  border-bottom: 1px solid darkgray;
`

/* Ticket shape

"ticket": {
    "ticket_id": 2,
    "title": "Ticket tittle",
    "description": "Ticket description",
    "attempted_solution":"Ticket solution Attempted  by user",
    "created_at": "2020-01-31T22:55:39.100Z",
    "completed": false,
    "user_id": 1
}

*/
const Ticket = (props) => {
  const [ticketData, setTicketData] = useState(userTicketsTest[0])

  useEffect(() => {
    const id = props.match.params.id;
    console.log(id)

    // Simulate an API call until the backend has been fully
    // hooked up to this component
    setTicketData(userTicketsTest[id-1])
  
    // // Get ticket data from the API
    // axiosWithAuth().get('/auth/user/tickets')
    //   .then(res => console.log("Ticket API response:", res))
    //   .catch(err => console.log("Ticket API error:", err))

  }, []);
  
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const isHelped = ticketData.helper
  const derivedClass = isAdmin ? (isHelped ? 'details-helped' : 'details-nothelped') : 'details-user';
  const noTicketHelperMsg = isAdmin ? 'Help Student' : `Helper: ${ticketData.helper}`;
  const ticketHelperDetail = isHelped ? `Helper: ${ticketData.helper}` : noTicketHelperMsg;

  // Click handler for the TicketHelper component
  const handleClick = () => {
    if (isAdmin && !isHelped) {
      setTicketData({...ticketData, helper: [loggedInUser.full_name]})
    }
  }

  return (
    <TicketWrapper>
      <TicketColumn>
        <TicketRow>
          <TicketTitle>{ticketData.title}</TicketTitle>
        </TicketRow>
        <TicketDescWrapper>
          <TicketDescription>{ticketData.description}</TicketDescription>
        </TicketDescWrapper>
        <TicketRow>
          <TicketDetails>
            <TicketDetail>Id: {ticketData.ticket_id}</TicketDetail>
            <TicketDetail>Submitter: {ticketData.submitter}</TicketDetail>
            <TicketDetail>Status: {ticketData.status}</TicketDetail>
            <TicketHelper className={derivedClass} onClick={handleClick}>{ticketHelperDetail}</TicketHelper>
          </TicketDetails>
        </TicketRow>
      </TicketColumn>
      <TicketColumn>
        <TicketRow>
            <TicketHistoryTitle>Attempted Solutions:</TicketHistoryTitle>
        </TicketRow>
        <TicketSolutions>
          {
            ticketData.attempted_solution.map((sol, index) => (
              <TicketSolutionRow key={index}>
                <TicketSolution>{sol}</TicketSolution>
              </TicketSolutionRow>
              ))
          }
        </TicketSolutions>
      </TicketColumn>
    </TicketWrapper>
  );
}

export default Ticket;