import styled from "styled-components"


// Header.js

export const HeaderC = styled.nav`
background-color: #f5f5dc;
height: 70px;
width:100%;
display: flex;
flex-direction: raw;
align-items: center;
justify-content: space-around;
font-size: 50px
color: gray;
font-weight:bold

`
export const Title=styled.h1`
  color:#726056;
  
`
 // login, sign-up

export const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #444;
    background: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b') no-repeat center center fixed;
    // background: url('https://images.unsplash.com/photo-1485470733090-0aae1788d5af') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 91.8vh;
`
export const Form = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 18px;
    width: 30%;
    background-color: white;
    opacity: 0.9;
    z-index: 0;
    overflow: hidden;
    @media (max-width: 1200px) {
        width: 50%;
    }
    @media (max-width: 900px) {
        width: 80%;
    }
    @media (max-width: 600px) {
        width: 95%;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`
 export const FormTitle = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 3.5rem;
    color: #444;
    opacity: 1;
    @media (max-width: 1200px) {
        // font-size: 2.5rem;
    }
`
export const FormInput = styled.input`
    padding: 4%;
    margin: 2% 0%;
    border: none;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius: 25px;
    -webkit-box-shadow: 0 0 4px #333 inset;
    -moz-box-shadow: 0 0 4px #333 inset;
    box-shadow: 0 0 4px #333 inset;
    text-indent: 5px;
    width: 80%;
    background: lightgray;
    color: black;
    font-size: 1.2rem;
    &:focus {
        outline: none;
        box-shadow: 0 0 8px 2px #444;
    }
`
export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    margin-bottom: 2%;
`
export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2%;
    padding: 5%;
    overflow: hidden;
    white-space: wrap;
    background: #333;
    color: #fff;
    outline: 0;
    font-size: 0.9rem;
    border-radius: 5px;
    height: 4rem;
    width: 7rem;
    @media (max-width: 1200px) {
        height: 3rem;
        width: 5rem;
        font-size: 0.8rem;
    }
`


//Ticket.js

export const TicketWrapper = styled.div`
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

export const TicketColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid darkgray;
`

export const TicketRow = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid darkgray;
`

// Left hand side
export const TicketTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
`

export const TicketDescWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid darkgray;
  background-color: lightgray;
`

export const TicketDescription = styled.div`
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
export const TicketDetails = styled.div`
  display: flex;
  background-color: #f1eeee;
  height: 100%;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

export const TicketDetail = styled.p`
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

export const TicketHelper = styled.p`
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
export const TicketHistoryTitle = styled.h3`
  margin-left: 2%;
  overflow: hidden;
  font-style: italic;
`

export const TicketSolutions = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  border-left: 1px solid black;
  overflow-y: scroll;
  word-wrap: break-word;
  height: 20rem; 
`

export const TicketSolutionRow = styled.div`
  background: white;
  width: 99.9%;
`

export const TicketSolution = styled.p`
  padding: 1%;
  font-size: 1em;
  border-bottom: 1px solid darkgray;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

export const FormWrapperA = styled.div`
  padding: 1% 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1eeee;
  height: 100%;
  width: 100%;
`

export const FormA = styled.form`
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 80%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export const FormInputA = styled.textarea`
  max-width: 100%; 
  max-height: 100%;
  width: 50rem;

  &:focus {
    // box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 8px 2px #0099FE;
    outline: 0;
`

export const SubmitButton = styled.button`
  background: #333;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  outline: 0;
`


//TicketCard.js


export const TicketWrapperB = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-top: 1%;
  margin-bottom: 1%;
  border-radius: 5px;
  border: 1.5px solid black;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 60%;
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.4s ease;
    background-color: lightgray;
    border: 1.5px solid #333;
  }

`

export const TicketRowB = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid darkgray;
`

export const TicketTitleB = styled.h3`
  margin-left: 2%;
  overflow: hidden;
`
// At the breakpoint, the ticket details display in a column
// This helps simplify responsiveness for the component
// This necesitated style changes to border, color and background
export const TicketDetailsB = styled.div`
  display: flex;
  background-color: #f1eeee;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

export const TicketDetailB = styled.p`
  margin: 2%;
  border: 1px solid gold;
  overflow: hidden;
  white-space: nowrap;
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

export const TicketHelperB = styled.p`
  margin: 2%;
  border: 1px solid #333;
  white-space: nowrap;
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


//Tickets.js
export const TicketsWrapperC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin: 2% 0%;
`