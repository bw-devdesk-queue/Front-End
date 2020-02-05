import React,{useState} from "react"
import {connect} from "react-redux"
import { addticket } from "../actions/actions"

 const TicketForm =(props)=>{ 
     const id = props.match.params.id

     const [addTicket,setAddTicket]=useState({
         title:"",
         description:"",
         completed:false,
     })

     const handleChange=event=>{
        setAddTicket({...addTicket,[event.target.name]:event.target.value})
     }

     const handleSubmit=event=>{
         event.preventDefault()
         props.addticket(addTicket,id)
         setAddTicket({
            title:"",
            description:"",
            completed:false
         })
     }
   

    return(
 
        <form onSubmit={handleSubmit}>

        <legend>Here You Can Add Your Ticket</legend>
        <fieldset>
            Title:<br/><textarea name="title" type="text" placeholder="Here You Can Add The Title OF The Ticket." value={addTicket.title} onChange={handleChange}/>
            Description: <textarea name="description" type="text" placeholder="Here You Can Add The Description OF The Ticket." value={addTicket.description} onChange={handleChange}/>
            <button type="submit">..........ADD ..........</button>
         </fieldset>   
        </form>
    )
 }

 export default connect(state=>{return state},{addticket}) (TicketForm);