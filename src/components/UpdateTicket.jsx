import React,{useState} from "react"
import {connect} from "react-redux"
// import { updateTicket } from "../actions/actions"

 const UpdateForm =(props)=>{ 
     const id = props.match.params.id
     console.log(props)

     const [updatedTicket, setupdatedTicket]=useState({
        "title": "anna has updateee",
        "submitted_by": "Josh",
        "description": "hwa hahahah",
        
        "completed": true,
         "attempted_solution":""
        
     })

     const handleChange=event=>{
        // setupdatedTicket({...updatedTicket,[event.target.name]:event.target.value})
     }

     const handleSubmit=event=>{
         event.preventDefault()
        //  props.updateTicket(id,updateTicket)
        //  console.log(updatedTicket,"ttt")
         setupdatedTicket({
            title:"",
            description:"",
            completed:false
         })
     }
   

    return(
 
        <form onSubmit={handleSubmit}>

        <legend>Here You Can Update Your Ticket</legend>
        <fieldset>
            {/* Update Title:<br/><textarea name="title" type="text" placeholder="Here You Can Update The Title OF The Ticket." value={updateTicket.title} onChange={handleChange}/>
            Update Description: <textarea name="description" type="text" placeholder="Here You Can Update The Description OF The Ticket." value={updateTicket.description} onChange={handleChange}/>
            attempted_solution: <textarea name="attempted_solution" type="text" placeholder="Here You Can Update The Description OF The Ticket." value={updateTicket.attempted_solution} onChange={handleChange}/>
            <button type="submit">..........Update ..........</button> */}
         </fieldset>   
        </form>
    )
 }

 export default connect(state=>{return state},{}) (UpdateForm);