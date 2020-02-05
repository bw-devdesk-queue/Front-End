import React,{useEffect} from "react"
import {connect} from "react-redux"
import {getoneticket} from "../actions/actions"

const GetSpecificTicket=()=>{

    useEffect(()=>{
        getoneticket(20)
    },[getoneticket])

    return(
        <div>
<h1>Specific ticket</h1>
        </div>
    )
}

export default connect(state=>{return state},{getoneticket}) (GetSpecificTicket);