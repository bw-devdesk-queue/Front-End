import React, { useEffect } from "react"
import {connect} from "react-redux"
import { userTickets, recoverUser } from "../actions/actions"
import Ticket from "./AllTickets"

import {storeUser, checkForUserRecovery} from '../utils/utils';
import { useHistory } from 'react-router-dom';

const UserHome=(props)=>{
    const id = props.match.params.id;
    const history = useHistory();

    
    useEffect(()=>{
        id ? storeUser(props.user) : props.recoverUser(checkForUserRecovery(history));
        props.userTickets(id)
    },[userTickets])

    const sendPath=()=>{
        props.history.push(`/home/user/${id}/add-ticket`)
    }
    return(
        <>
        
            <h1>hello {props.name}</h1>
        <button onClick={sendPath}>Add Tickets</button>
        
        <Ticket key={Ticket.ticket_id}  ticket={props.tickets} props={props}/>
        
        
        </>
    )
}

const mapStateToProps=state=>{
    return{
        tickets:state.user.userTickets,
        name:state.user.name,
        user: state.user
    }
}
export default connect(mapStateToProps,{userTickets, recoverUser}) (UserHome);