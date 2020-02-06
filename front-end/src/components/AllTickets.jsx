import React from "react"
import {updateticket} from "../actions/actions"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

const Ticket=(props)=>{
   const id =props.props.match.params.id
    return(
        <div>
            {props.ticket.map(Ticket=>(
                <div key={Ticket.ticket_id}>
                     <h5>Title:<br/>{Ticket.title}</h5>
                     <h5>Description:<br/>{Ticket.description}</h5>
                     <h5> Date: <br/>{Ticket.created_at}</h5>
                    <Link to={`/home/user/${id}/ticket/${Ticket.ticket_id}`}>update</Link><br/><br/>
                </div>
            ))}
    
        </div>
    )
}


export default connect(state=>{return state},{updateticket}) (Ticket);