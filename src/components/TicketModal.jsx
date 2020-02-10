import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import './Styles/Ticket.scss';
import { axiosWithAuth } from '../utils/utils';
import Modal from "react-animated-modal";

 // State management and updating
import { updateTicket, updateTicketState} from "../actions/actions"
import { useSelector, useDispatch } from 'react-redux';

// Test data
const loggedInUser = JSON.parse(localStorage.getItem('user')).full_name || "Test User";

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
const TicketModal = (props) => {
  // Variables
  const ticketId = props.match.params.id

  // Redux state
  const dispatch = useDispatch();
  const state = useSelector( state => {
    return {
      tickets: state.user.userTickets,
      user: state.user
    }
  });
  const userState = useSelector( state => {
    return {
        user: state.user
    }
  });

  // State hook
  const [allUsers, setUsers] = useState([]);
  const [ticketData, setTicketData] = useState({
    "ticket_id": 0,
    "title": "",
    "description": "",
    "attempted_solution":"",
    "created_at": "",
    "assigned_to": 0,
    "completed": false,
    "user_id": 0
  });
  const [solution, setSolution] = useState('');

  // At mount, get users and populate allUsers state
  useEffect( () => {
   if(userIsAdmin) axiosWithAuth().get('/auth/user')
                   .then( res => {
                      console.log('Users Will Be: ', res.data);
                      setUsers(res.data.users)
                    })
                   .catch(err => console.log('Error Fetching Users: ', err));
  }, [])

  // At mount, get tickets and populate ticketData state
  useEffect(() => {
    const id = props.match.params.id;
    setTicketData( {...ticketData, ...state.tickets.find( ticket => String(ticket.ticket_id) === String(id) )} )
  }, []);

  // David GET example (in case needed for MVP)
  // Get the target ticket from the API I first must GET all tickets
  useEffect(() => {
    axiosWithAuth().get('/api/tickets')
      .then(res => res.data.tickets.filter(ticket => parseInt(ticket.ticket_id) === parseInt(ticketId)))
      .then(ticket => console.log("David's Axios-Fetched Ticket:", ticket))
      .catch(err => console.log("Ticket API error:", err))
  }, [ticketData.attempted_solution, ticketData.completed, ticketData.assigned_to]); //assigned_to has been removed since backend doesn't work fully - DLW
  
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const solutions = ticketData?.attempted_solution?.split('|') || '';
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const userIsAdmin = rolePath === 'admin';
  const ticketIsHelped = (parseInt(ticketData.assigned_to) !== parseInt(0));
  const ticketIsCompleted = ticketData?.completed;
  const isMyUserTicket = (!userIsAdmin && ticketData?.user_id === userState.user.id);

  // Variables for the text of the helper button
  const noTicketHelperMsg = userIsAdmin ? 'Help Student' : `Helper: ${ticketData?.completed}`;
  const ticketHelperMsg = `Helper: ${ticketData?.assigned_to}`;
  const ticketHelperDetail = ticketIsHelped ? ticketHelperMsg : noTicketHelperMsg;
  const derivedClass = userIsAdmin ? (ticketIsHelped ? 'details-helped' : 'details-nothelped') : 'details-user';

  useEffect(() => {
    console.log(`Updating ticket #${ticketData.ticket_id}`, ticketData)
    const getRequiredSubset = ({title, submitted_by, description, attempted_solution, completed}) => 
                              ({title, submitted_by, description, attempted_solution, completed})
    const subset = getRequiredSubset(ticketData);
    dispatch(updateTicket(subset, ticketData.ticket_id));
  }, [ticketData.attempted_solution, ticketData.completed, dispatch]) //assigned_to has been removed since backend doesn't work fully - DLW


  // Click handler for the assigned to button
  const handleHelperClick = () => {
    if (userIsAdmin) {
      if (!ticketIsHelped) {
        setTicketData({...ticketData, assigned_to: loggedInUser}); // backend placeholder due to issues with updating tickets
      }
      dispatch(updateTicketState(ticketData)) // backend issue workaround for demo purposes
    }
  }
  
  // Variables for the text of the resolve ticket button
  const ticketResolvedDetail = isMyUserTicket ? 'Cancel Ticket' : 'Close Ticket';
  
  // Click handler for the TicketAssignedTo component
  const handleResolvedClick = () => {
    const isResolved = ticketData?.completed === "true";
    if (!isResolved) {
      setTicketData({...ticketData, completed: true});
    }
    dispatch(updateTicketState(ticketData)) // backend issue workaround for demo purposes
  }

  // Click handler for the Ticket reassign button
  const handleReassignClick = () => {
    if (ticketIsHelped) {
      setTicketData({...ticketData, assigned_to: 0})
    }
    dispatch(updateTicketState(ticketData)) // backend issue workaround for demo purposes
  }

  // Form submission for the solutions textarea box
  const handleSubmit = event => {
    event.preventDefault();
    // Form validation
    const noValue = solution.length === 0;
    const formIsValidated = !noValue;
    // Parse and resubmit pipe-delimited string + substring
    if (formIsValidated) {
      const updatedSolutions = [...solutions, solution].join('|');
      setTicketData({...ticketData, 'attempted_solution': updatedSolutions});
      setSolution('');
    }
  }
  const handleChange = event => {
    setSolution(event.target.value);
  }
  return (
    <div>
      <Modal
          visible={this.state.showModal}
          closemodal={() => this.setState({ showModal: false })}
          type="flipInX"
      >
        
      </Modal>
      <div onClick={() => this.setState({ showModal: true })}>
          Open Modal
      </div>
    </div>
  );
} 
export default TicketModal;
