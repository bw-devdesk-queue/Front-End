import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';
import { axiosWithAuth } from '../utils/utils';
import Modal from "react-animated-modal";

// Test data
import userTicketsTest from '../testData';
import testTickets from '../testData';

import { updateTicket } from '../actions/actions';

import { useSelector, useDispatch } from 'react-redux';

const loggedInUser = {full_name: "David L White"};

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-bottom: 1%;
  margin-left: 1%;
  border-radius: 5px;
  border: 1.5px solid black;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 97.5%;
`

const TicketColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid darkgray;
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
  height: 100%;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const TicketDetail = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  word-wrap: break-word;
  height: 20rem; 
`

const TicketSolutionRow = styled.div`
  background: white;
  width: 99.9%;
`

const TicketSolution = styled.p`
  padding: 1%;
  font-size: 1em;
  border-bottom: 1px solid darkgray;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const FormWrapper = styled.div`
  padding: 1% 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1eeee;
  height: 100%;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 80%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const FormInput = styled.textarea`
  max-width: 100%; 
  max-height: 100%;
  width: 50rem;

  &:focus {
    // box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 8px 2px #0099FE;
    outline: 0;
`

const SubmitButton = styled.button`
  background: #333;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  outline: 0;
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
  const ticketId = props.match.params.id;
  const dispatch = useDispatch();

  const state = useSelector( state => {
    return {
      tickets: state.user.userTickets,
      user: state.user
    }
  });

  const [allUsers, setUsers] = useState([]);

  const [ticketData, setTicketData] = useState({
    "ticket_id": 0,
    "title": "",
    "description": "",
    "attempted_solution":"",
    "created_at": "",
    "assigned_to": "Not Yet Assigned",
    "completed": false,
    "user_id": 0
  });
  const userState = useSelector( state => {
    return {
        user: state.user
    }
  });

  const [solution, setSolution] = useState('');

  // Get users and populate allUsers state
  useEffect( () => {
   if(isAdmin) axiosWithAuth().get('/auth/user')
                   .then( res => {
                      console.log('Users Will Be: ', res.data);
                      setUsers(res.data.users)
                    })
                   .catch(err => console.log('Error Fetching Users: ', err));
  }, [])

  // Get tickets and populate ticketData state
  useEffect(() => {
    const id = props.match.params.id;

    console.log("I'm loading")
    console.log(id, state);

    setTicketData( {...ticketData, ...state.tickets.find( ticket => String(ticket.ticket_id) === String(id) )} )
  }, []);
  
    // David GET example (in case needed for MVP)
    // Get the target ticket from the API
    // I first must GET all tickets, then I verify 
    // equality of match ticket_id and page id and 
    // id from props.match.params.id
  useEffect(() => {
    axiosWithAuth().get('/api/tickets')
      .then(res => res.data.tickets.filter(ticket => parseInt(ticket.ticket_id) === parseInt(ticketId)))
      .then(ticket => console.log("David's Axios-Fetched Ticket:", ticket))
      .catch(err => console.log("Ticket API error:", err))
  }, [ticketData]);
  
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const solutions = ticketData?.attempted_solution.split('|') || '';
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const isHelped = !ticketData?.assigned_to == undefined;
  console.log(ticketData.assigned_to)
  const isMyUserTicket = (!isAdmin && ticketData?.user_id === userState.user.id);

  // Variables for the text of the helper button
  const derivedClass = isAdmin ? (isHelped ? 'details-helped' : 'details-nothelped') : 'details-user';
  const noTicketHelperMsg = isAdmin ? 'Help Student' : `Helper: ${ticketData?.helper}`;
  const ticketHelperDetail = isHelped ? `Helper: ${ticketData?.assigned_to}` : noTicketHelperMsg;


  useEffect(() => {
    console.log(`Updating ticket #${ticketData.ticket_id}`, ticketData)
    dispatch(updateTicket(ticketData, ticketData.ticket_id));
  }, [ticketData.assigned_to, ticketData.attempted_solution, dispatch])

  // Click handler for the TicketHelper component
  const handleHelperClick = () => {
    if (isAdmin && !isHelped) {
      console.log("user:", userState)
      setTicketData({...ticketData, assigned_to: allUsers[userState.user.id]?.full_name})
    }
  }

  // Variables for the text of the resolve ticket button
  const ticketResolvedDetail = isMyUserTicket ? 'Cancel Ticket' : 'Close Ticket';

  // Click handler for the TicketHelper component
  const handleResolvedClick = () => {
    const isResolved = ticketData?.resolved === true;
    if (!isResolved) {
      setTicketData({...ticketData, resolved: 'solved'});
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    // Form validation
    const noValue = solution.length === 0;
    const isValidated = !noValue;

    // Parse and resubmit pipe-delimited string + substring
    if (isValidated) {
      const updatedSolutions = [...solutions, solution].join('|');
      setTicketData({...ticketData, 'attempted_solution': updatedSolutions});
      setSolution('');
    }
  }

  const handleChange = event => {
    setSolution(event.target.value);
  }

  return (
    <TicketWrapper>
      {/* Header Row */}
      <TicketRow className="header">
        {/* Left Side */}
        <TicketColumn className="left-side">
          <TicketTitle>{ticketData?.title}</TicketTitle>
        </TicketColumn>
        {/* Right side */}
        <TicketColumn className="right-side">
          <TicketHistoryTitle>Attempted Solutions:</TicketHistoryTitle>
        </TicketColumn>
      </TicketRow>

      {/* Main content row */}
      <TicketRow className="main">
        {/* Left side */}
        <TicketColumn className="left-side">
          <TicketDescWrapper>
            <TicketDescription>{ticketData?.description}</TicketDescription>
          </TicketDescWrapper>
        </TicketColumn>
        {/* Right side */}
        <TicketColumn className="right-side">
          <TicketSolutions>
            {
              solutions?.map((sol, index) => (
                <TicketSolutionRow key={index}>
                  <TicketSolution>{sol}</TicketSolution>
                </TicketSolutionRow>
              ))
            }
          </TicketSolutions>
        </TicketColumn>
      </TicketRow>

      {/* Footer row */}
      <TicketRow className="footer">
        {/* Left side */}
        <TicketColumn className="left-side">
          <TicketDetails>
            <TicketDetail>Id: {ticketData?.ticket_id}</TicketDetail>
            <TicketDetail>Submitter: {isAdmin ? allUsers && allUsers?.find(user => user.id === ticketData?.user_id)?.full_name : state.user.name}</TicketDetail>
            <TicketDetail>Status: {ticketData?.completed ? 'Resolved' : 'Active'}</TicketDetail>
            <TicketHelper className={derivedClass} onClick={handleHelperClick}>{ticketHelperDetail}</TicketHelper>
            {
              (isAdmin || isMyUserTicket) ? 
                <TicketDetail onClick={handleResolvedClick}>{ticketResolvedDetail}</TicketDetail> : null
            }

          </TicketDetails>
        </TicketColumn>
        {/* Right side */}
        <TicketColumn className="right-side">
          {/* Add solution form */}
          <FormWrapper>
            <p>Add a solution</p>
            <Form onSubmit={handleSubmit}>
              <FormInput type="text" onChange={handleChange} value={solution} name="solution" placeholder="Solution"></FormInput>
              <SubmitButton type="submit">Add</SubmitButton>
            </Form>
          </FormWrapper>
        </TicketColumn>
      </TicketRow> 
    </TicketWrapper>
  );
} 

export default Ticket;