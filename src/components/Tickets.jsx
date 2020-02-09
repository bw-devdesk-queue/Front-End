import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import {TicketsWrapperC} from "./Styles/StyleWidgets"
import StudentTabs from "./StudentTabs";
import AdminTabs from "./AdminTabs"
import { userTickets, recoverUser,getalltickets , adminTickets} from '../actions/actions';
import { checkForUserRecovery, storeUser } from '../utils/utils';
import {connect} from "react-redux"
import { useRouteMatch } from 'react-router-dom';



const Tickets = (props) => {
  console.log(props,"proptickets")
  const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';

  useEffect( () => {
    
    // props.userTickets(5)
    // props.getalltickets(8)
    // setUserData(props)
    // props.getalltickets()
    // getalltickets(5)
    // rolePath === 'admin' ? props.adminTickets(): props.user.tickets();
    props.user.id ? storeUser(props.user) : props.recoverUser(checkForUserRecovery(props.history));
  }, [])

// console.log(userData,"userData")

 
  return (
    <>
      <TicketsWrapperC>
        {props.history.location.pathname==="/user/tickets"?<StudentTabs/>:<AdminTabs/>}

    

        {
          props.tickets.sort( (a, b) => Number(a['ticket_id']) - Number(b['ticket_id'])).map(ticket => {
          return <TicketCard name={props.name} data={ticket} key={ticket.id} />})
        }
       
      </TicketsWrapperC>
    </>
  );
}

const mapStateToProps=state=>{
  return{
    user: state.user,
      email:state.user.email,
      tickets: state.user.userTickets,
      name:state.user.name,
      id:state.user.userId
  }
}

export default connect(mapStateToProps,{userTickets,recoverUser, getalltickets,adminTickets})(Tickets);