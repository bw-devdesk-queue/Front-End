import React, { useState, useEffect } from 'react';
import axios from "axios"
import {TicketDescWrapper,TicketColumn, TicketRow , 
  TicketTitle, TicketWrapper, TicketDescription,
   TicketDetails,TicketDetail,TicketHelper,
   TicketHistoryTitle,TicketSolutions,TicketSolutionRow,
   TicketSolution,FormWrapperA,FormA,FormInputA,
   SubmitButton}from "./Styles/StyleWidgets"

import { useRouteMatch } from 'react-router-dom'

import './Styles/Ticket.scss';
import { axiosWithAuth } from '../utils/utils';
import {connect} from "react-redux"

// Test data
import userTicketsTest from '../testData';
import testTickets from '../testData';

import { updateTicket, axiosUpdateTicket} from "../actions/actions"

import { useSelector, useDispatch } from 'react-redux';

const loggedInUser = {full_name: "David L White"};



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
    ticket_id: parseInt(ticketId),
    "title": "ghgfb",
    "description": "hwa hahahah",
    "submitted_by": "Joshfbf",
    "attempted_solution":"vgnfghmbn",
    // "created_at": "",
    // "assigned_to": "Not Yet Assigned",
    "completed": false,
    // "user_id": 0
  });
 
  const userState = useSelector( state => {
    return {
        user: state.user
    }
  });
  const [solution, setSolution] = useState('');

  useEffect( () => {
   if(isAdmin) axiosWithAuth().get('/auth/user')
                   .then( res => {
                      console.log('Users Will Be: ', res.data);
                      setUsers(res.data.users)
                    })
                   .catch(err => console.log('Error Fetching Users: ', err));
  }, [])
  // Get tickets and populate ticketData state
  // useEffect(() => {
  //   const id = props.match.params.id;
  //   console.log(id,"idf")
  //   setTicketData( {...ticketData, ...state.tickets.find( ticket => String(ticket.ticket_id) === String(id) )} )
    
  // }, []);
  
  useEffect(() => {
    axiosWithAuth().get('/api/tickets')
      .then(res => res.data.tickets.filter(ticket => parseInt(ticket.ticket_id) === parseInt(ticketId)))
      .then(ticket => 
        
        console.log("David's Axios-Fetched Ticket:", ticket)
        )
      .catch(err => console.log("Ticket API error:", err))
  }, [ticketData]);
  // Ticket details vars
  // The buttons render dynamically depending on the role of the logged in user
  // Doing this allows us to reuse ticket components
  const solutions = ticketData?.attempted_solution?.split('|') || '';
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
  const isAdmin = rolePath === 'admin';
  const isHelped = (!ticketData?.assigned_to == undefined && ticketData.assigned_to.length > 0);
  const isMyUserTicket = (!isAdmin && ticketData?.user_id === userState.user.id);
  const userToken = localStorage.getItem('token');
  // Variables for the text of the helper button
  const noTicketHelperMsg = isAdmin ? 'Help Student' : `Helper: ${ticketData?.assigned_to}`;
  const ticketHelperMsg = `Helper: ${ticketData?.assigned_to}`;
  const ticketHelperDetail = isHelped ? ticketHelperMsg : noTicketHelperMsg;
  const derivedClass = isAdmin ? (isHelped ? 'details-helped' : 'details-nothelped') : 'details-user';
  const detailsHelpedBtn = document.querySelector('.details-helped');
  if (detailsHelpedBtn) {
    detailsHelpedBtn.addEventListener('mouseover', () => detailsHelpedBtn.textContent = 'Unassign');
    detailsHelpedBtn.addEventListener('mouseout', () => detailsHelpedBtn.textContent = ticketHelperMsg);
  }
  // useEffect(() => {
  //   console.log(`Updating ticket #${ticketData.ticket_id}`, ticketData)
  //   // dispatch(updateTicket(ticketData, ticketData.ticket_id));
  //   console.log("Token", userToken)
  //   console.log("ticketData", ticketData)
    
  // }, [ticketData.assigned_to, ticketData.attempted_solution, ticketData.completed, dispatch])
  useEffect(() => {
    // console.log(`Updating ticket #${ticketData.ticket_id}`, ticketData)
    // const getRequiredSubset = ({title, submitted_by, description, attempted_solution, completed}) => 
    //                           ({title, submitted_by, description, attempted_solution, completed})
    // const subset = getRequiredSubset(ticketData);
     // dispatch(updateTicket(ticketData, ticketData.ticket_id));
  }, [ticketData.assigned_to, ticketData.attempted_solution, ticketData.completed, dispatch])
  // Click handler for the TicketHelper component
  const handleHelperClick = () => {
    if (isAdmin) {
      if (!isHelped) {
        // Grab the user id from the state object and match it to the id of the correct user in allUsers
        // setTicketData({...ticketData, assigned_to: "David L White"}) // backend test
        // setTicketData({...ticketData, assigned_to: allUsers.filter(user => String(user.id) === String(userState.user.id))?.full_name}) // backend PUT requests are not working
        setTicketData({...ticketData, assigned_to: parseInt(state.user.id)}) // backend PUT requests are not working
      } else {
        setTicketData({...ticketData, assigned_to: null}) // Unassign self
      }
    }
  }
  // Variables for the text of the resolve ticket button
  const ticketResolvedDetail = isMyUserTicket ? 'Cancel Ticket' : 'Close Ticket';
  // Click handler for the TicketHelper component
  const handleResolvedClick = () => {
    const isResolved = ticketData?.completed === "true";
    if (!isResolved) {
      // setTicketData({...ticketData, completed: true});
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
      // setTicketData({...ticketData, 'attempted_solution': updatedSolutions});
      // setSolution('');
    

      

      // setTicketData({...ticketData, 'attempted_solution': updatedSolutions});
      // dispatch(updateTicket(props.match.params.id,{
      //   "title": "ramy",
      //   "submitted_by": "Ramy",
      //   "description": "Ramy",
      //   "attempted_solution": "Ramy",
      //   "completed": true
      // }))
      // dispatch(updateTicket(ticketData.ticket_id, ticketData));

      
        // axios({
        //   method: 'put',
        //   url: `https:/devdeskbe.herokuapp.com/api/tickets/${ticketId}`,
        //   headers: {
        //     authorization: localStorage.getItem("token"),
        //   },
          
        //   data: {
        //     "title": ticketData.title,
        //     "submitted_by": ticketData.submitted_by,
        //     "description": ticketData.description,
        //     "attempted_solution": ticketData.attempted_solution,
        //     "completed": true
        //   }
        // })
        // .then(res => {
        //   console.log('Update ticket response', res.data.ticket[0])
        //   localStorage.setItem(ticketId,JSON.stringify(res.data.ticket[0]))
        //   dispatch({type:"UPDATE_TICKET", payload:res.data.ticket[0]})
        // })
        // .catch(err => console.log('Update ticket error:', err))

        const newTicketData = {...ticketData, 'attempted_solution': updatedSolutions};
        console.log(`Updating ticket #${newTicketData.ticket_id}`, newTicketData)
        const getRequiredSubset = ({title, submitted_by, description, attempted_solution, completed}) => 
                                  ({title, submitted_by, description, attempted_solution, completed})
        const subset = getRequiredSubset(newTicketData);
        console.log("Subset", solutions)
        console.log("newTicketData", ticketData)
        dispatch(updateTicket({
          "title": "ghgfb",
    "description": "hwa hahahah",
    "submitted_by": "Joshfbf",
    "attempted_solution":"",
    // "created_at": "",
    // "assigned_to": "Not Yet Assigned",
    "completed": false,
    // "user_id": 0
        }, ticketData.ticket_id));
      
      
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
              (solutions ? solutions : [])?.map((sol, index) => (
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
          <FormWrapperA>
            <p>Add a solution</p>
            <FormA onSubmit={handleSubmit}>
              <FormInputA type="text" onChange={handleChange} value={solution} name="solution" placeholder="Solution"></FormInputA>
              <SubmitButton type="submit">Add</SubmitButton>
            </FormA>
          </FormWrapperA>
        </TicketColumn>
      </TicketRow> 
    </TicketWrapper>
  );
} 

const mapStateToProps=state=>{
  return{
title:state.ticketData.title,
submitted_by:state.ticketData.submitted_by,
description:state.ticketData.description,
attempted_solution:state.ticketData.attempted_solution,
completed:state.ticketData.completed
  }
}
export default connect(mapStateToProps,{}) (Ticket);