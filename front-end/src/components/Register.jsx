import React,{useState} from "react"
import {register} from "../actions/actions"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"


 const Register =()=>{ 

    const history= useHistory()
     const [userData,setUserData]=useState({
         full_name:"",
         email:"",
         password:""
     })

     const dispatch= useDispatch()

     const handleChange=event=>{
        setUserData({...userData,[event.target.name]:event.target.value})
     }

     const handleSubmit=event=>{
         event.preventDefault()
        console.log(userData)
        dispatch(register({...userData, role:"user"},history))
        
         setUserData({
            full_name:"",
            email:"",
            password:""
         })
     }
   

    return(
        <form onSubmit={handleSubmit}>
            <input name="full_name" type="text" placeholder="Full Name" value={userData.full_name} onChange={handleChange}/>
            <input name="email" type="email" placeholder="Email" value={userData.email} onChange={handleChange}/>
            <input name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange}/>
            <button type="submit">Register</button>
        </form>
    )
 }

 export default Register;