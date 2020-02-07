// import React, { useState, useEffect } from 'react';
// import { useRouteMatch } from 'react-router-dom'
// import styled from 'styled-components';
// import './Styles/Ticket.scss';
// import { axiosWithAuth } from '../utils/utils';
// import Modal from "react-animated-modal";

// // Test data
// import userTicketsTest from './testData';
// import testTickets from './testData';

// import { useSelector, useDispatch } from 'react-redux';

// const loggedInUser = {full_name: "David L White"};

// const TicketWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: #fff;
//   margin-bottom: 1%;
//   margin-left: 1%;
//   border-radius: 5px;
//   border: 1.5px solid black;
//   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
//   width: 97.5%;
// `

// const TicketColumn = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   border: 1px solid darkgray;
// `

// const TicketRow = styled.div`
//   width: 100%;
//   display: flex;
//   border-bottom: 1px solid darkgray;
// `

// // Left hand side
// const TicketTitle = styled.h3`
//   margin-left: 2%;
//   overflow: hidden;
// `

// const TicketDescWrapper = styled.div`
//   width: 100%;
//   height: 20rem;
//   display: flex;
//   justify-content: center;
//   border-bottom: 1px solid darkgray;
//   background-color: lightgray;
// `

// const TicketDescription = styled.div`
//   border-right: 1px solid #333; 
//   border-left: 1px solid #333;
//   background: #fff;
//   margin: 0% 1%;
//   width: 95%; 
//   overflow-y: scroll;
// `

// // At the breakpoint, the ticket details display in a column
// // This helps simplify responsiveness for the component
// // This necesitated style changes to border, color and background
// const TicketDetails = styled.div`
//   display: flex;
//   background-color: #f1eeee;
//   height: 100%;
//   width: 100%;

//   @media (max-width: 1200px) {
//     flex-direction: column;
//   }
// `

// const TicketDetail = styled.p`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 2%;
//   border: 1px solid gold;
//   overflow: hidden;
//   white-space: wrap;
//   background: #333;
//   color: #fff;
//   padding: 0.5rem;
//   border-radius: 5px;

//   @media (max-width: 1200px) {
//     margin: 0;
//     padding: 0.5rem 0.5rem;
//     max-width: 100%;
//     border-top: 0;
//     border-left: 1px solid black; 
//     border-right: 1px solid black;
//     border-bottom: 1px solid gray;
//     border-radius: 0;
//     background-color: #f1eeee;
//     color: black;

//     &:first-child {
//       border-top: 1px solid gray;
//     }
//   }
// `

// const TicketHelper = styled.p`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 2%;
//   border: 1px solid #333;
//   white-space: wrap;
//   overflow: hidden;
//   padding: 0.5rem;
//   border-radius: 5px;

//   @media (max-width: 1200px) {
//     margin: 0;
//     padding: 0.5rem 0.5rem;
//     max-width: 100%;
//     border-left: 1px solid black; 
//     border-right: 1px solid black;
//     border-bottom: 1px solid black;
//     border-radius: 0;
//   }
// `

// // Right hand side
// const TicketHistoryTitle = styled.h3`
//   margin-left: 2%;
//   overflow: hidden;
//   font-style: italic;
// `

// const TicketSolutions = styled.div`
//   height: 100%;
//   margin: 0;
//   padding: 0;
//   border-left: 1px solid black;
//   overflow-y: scroll;
//   word-wrap: break-word;
//   height: 20rem; 
// `

// const TicketSolutionRow = styled.div`
//   background: white;
//   width: 99.9%;
// `

// const TicketSolution = styled.p`
//   padding: 1%;
//   font-size: 1em;
//   border-bottom: 1px solid darkgray;
//   display: block;
//   margin-block-start: 1em;
//   margin-block-end: 1em;
//   margin-inline-start: 0px;
//   margin-inline-end: 0px;
// `

// const FormWrapper = styled.div`
//   padding: 1% 0%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: #f1eeee;
//   height: 100%;
//   width: 100%;
// `

// const Form = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: baseline;
//   width: 80%;

//   @media (max-width: 600px) {
//     flex-direction: column;
//   }
// `

// const FormInput = styled.textarea`
//   max-width: 100%; 
//   max-height: 100%;
//   width: 50rem;

//   &:focus {
//     // box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
//     box-shadow: 0 0 8px 2px #0099FE;
//     outline: 0;
// `

// const SubmitButton = styled.button`
//   background: #333;
//   color: #fff;
//   padding: 0.25rem 0.75rem;
//   border-radius: 5px;
//   outline: 0;
// `

// /* Ticket shape

// "ticket": {
//     "ticket_id": 2,
//     "title": "Ticket tittle",
//     "description": "Ticket description",
//     "attempted_solution":"Ticket solution Attempted  by user",
//     "created_at": "2020-01-31T22:55:39.100Z",
//     "completed": false,
//     "user_id": 1
// }

// */
// const Ticket = (props) => {
//   const state = useSelector( state => {
//     return {
//       tickets: state.user.userTickets,
//       user: state.user
//     }
//   })
//   const [ticketData, setTicketData] = useState({
//     "ticket_id": 0,
//     "title": "",
//     "description": "",
//     "attempted_solution":"",
//     "created_at": "",
//     "completed": false,
//     "user_id": 0
// });
//   const [solution, setSolution] = useState('');

//   useEffect(() => {
//     const id = props.match.params.id;

//     console.log("I'm loading")
//     console.log(id, state);
//     // Simulate an API call until the backend has been fully
//     // hooked up to this component
//     setTicketData(state.tickets.find( ticket => String(ticket.ticket_id) === String(id) ) )
  
//     // // Get all ticket data from the API
//     // axiosWithAuth().get('/auth/user/tickets')
//     //   .then(res => console.log("Ticket API response:", res))
//     //   .catch(err => console.log("Ticket API error:", err))

//   }, []);
  
//   // Ticket details vars
//   // The buttons render dynamically depending on the role of the logged in user
//   // Doing this allows us to reuse ticket components
//   const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
//   const isAdmin = rolePath === 'admin';
//   const isHelped = ticketData?.helper
//   const derivedClass = isAdmin ? (isHelped ? 'details-helped' : 'details-nothelped') : 'details-user';
//   const noTicketHelperMsg = isAdmin ? 'Help Student' : `Helper: ${ticketData?.helper}`;
//   const ticketHelperDetail = isHelped ? `Helper: ${ticketData?.helper}` : noTicketHelperMsg;
//   const solutions = ticketData?.attempted_solution.split('|') || '';

//   // Click handler for the TicketHelper component
//   const handleClick = () => {
//     if (isAdmin && !isHelped) {
//       setTicketData({...ticketData, helper: [loggedInUser.full_name]})
//     }
//   }

//   const handleSubmit = event => {
//     event.preventDefault();

//     // Form validation
//     const noValue = solution.length === 0;
//     const isValidated = !noValue;

//     // Parse and resubmit pipe-delimited string + substring
//     if (isValidated) {
//       const updatedSolutions = [...solutions, solution].join('|');
//       setTicketData({...ticketData, 'attempted_solution': updatedSolutions});
//       setSolution('');
//     }
//   }

//   const handleChange = event => {
//     setSolution(event.target.value);
//   }

//   return (
//     <div>
//       <Modal
//           visible={this.state.showModal}
//           closemodal={() => this.setState({ showModal: false })}
//           type="flipInX"
//       >
//           Hello
//       </Modal>
//       <div onClick={() => this.setState({ showModal: true })}>
//           Open Modal
//       </div>
//     </div>







//     <TicketWrapper>
//       {/* Header Row */}
//       <TicketRow className="header">
//         {/* Left Side */}
//         <TicketColumn className="left-side">
//           <TicketTitle>{ticketData?.title}</TicketTitle>
//         </TicketColumn>
//         {/* Right side */}
//         <TicketColumn className="right-side">
//           <TicketHistoryTitle>Attempted Solutions:</TicketHistoryTitle>
//         </TicketColumn>
//       </TicketRow>

//       {/* Main content row */}
//       <TicketRow className="main">
//         {/* Left side */}
//         <TicketColumn className="left-side">
//           <TicketDescWrapper>
//             <TicketDescription>{ticketData?.description}</TicketDescription>
//           </TicketDescWrapper>
//         </TicketColumn>
//         {/* Right side */}
//         <TicketColumn className="right-side">
//           <TicketSolutions>
//             {
//               solutions?.map((sol, index) => (
//                 <TicketSolutionRow key={index}>
//                   <TicketSolution>{sol}</TicketSolution>
//                 </TicketSolutionRow>
//                 ))
//             }
//           </TicketSolutions>
//         </TicketColumn>
//       </TicketRow>

//       {/* Footer row */}
//       <TicketRow className="footer">
//         {/* Left side */}
//         <TicketColumn className="left-side">
//           <TicketDetails>
//             <TicketDetail>Id: {ticketData?.ticket_id}</TicketDetail>
//             <TicketDetail>Submitter: {ticketData?.submitter}</TicketDetail>
//             <TicketDetail>Status: {ticketData?.status}</TicketDetail>
//             <TicketHelper className={derivedClass} onClick={handleClick}>{ticketHelperDetail}</TicketHelper>
//           </TicketDetails>
//         </TicketColumn>
//         {/* Right side */}
//         <TicketColumn className="right-side">
//           {/* Add solution form */}
//           <FormWrapper>
//             <p>Add a solution</p>
//             <Form onSubmit={handleSubmit}>
//               <FormInput type="text" onChange={handleChange} value={solution} name="solution" placeholder="Solution"></FormInput>
//               <SubmitButton type="submit">Add</SubmitButton>
//             </Form>
//           </FormWrapper>
//         </TicketColumn>
//       </TicketRow> 
//     </TicketWrapper>
//   );
// }

// export default Ticket;