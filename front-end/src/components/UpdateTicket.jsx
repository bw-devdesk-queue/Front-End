import React,{useState} from "react"
import {connect} from "react-redux"
import { updateticket } from "../actions/actions"

 const UpdateForm =(props)=>{ 
     const id = props.match.params.id
     console.log(props)

     const [updateTicket,setupdateTicket]=useState({
         title:"",
         description:"",
         completed:false,
     })

     const handleChange=event=>{
        setupdateTicket({...updateTicket,[event.target.name]:event.target.value})
     }

     const handleSubmit=event=>{
         event.preventDefault()
         props.updateticket(updateTicket,id)
         setupdateTicket({
            title:"",
            description:"",
            completed:false
         })
     }
   

    return(
 
        <form onSubmit={handleSubmit}>

        <legend>Here You Can Update Your Ticket</legend>
        <fieldset>
            Update Title:<br/><textarea name="title" type="text" placeholder="Here You Can Update The Title OF The Ticket." value={updateTicket.title} onChange={handleChange}/>
            Update Description: <textarea name="description" type="text" placeholder="Here You Can Update The Description OF The Ticket." value={updateTicket.description} onChange={handleChange}/>
            <button type="submit">..........Update ..........</button>
         </fieldset>   
        </form>
    )
 }

 export default connect(state=>{return state},{updateticket}) (UpdateForm);