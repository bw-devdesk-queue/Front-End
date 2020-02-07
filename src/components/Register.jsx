import React,{useState} from "react"
import {authIn} from "../actions/actions"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { toggleRoleType, getRole } from "../utils/utils"


 const Register =()=>{ 

    const history= useHistory();
    const dispatch= useDispatch();
    const role = getRole(history.location.pathname);
    const oppositeRole = role === 'user' ? 'admin' : 'user';



     const [userData,setUserData]=useState({
         full_name:"",
         email:"",
         password:"",
         role: ""
     })

     const toggleRegistrationType = () => toggleRoleType(role, history);

     const handleChange=event=>{
        setUserData({...userData,[event.target.name]:event.target.value})
     };

     const handleSubmit=event=>{
        event.preventDefault()
        console.log(userData)
        dispatch(authIn({...userData, role: role}, history))
        
         setUserData({
            full_name:"",
            email:"",
            password:""
         });
     };
   

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input name="full_name" type="text" placeholder="Full Name" value={userData.full_name} onChange={handleChange}/>
                <input name="email" type="email" placeholder="Email" value={userData.email} onChange={handleChange}/>
                <input name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
            <button onClick={toggleRegistrationType}>{`Switch to ${oppositeRole} registration`}</button>
        </>
    );
 }

 export default Register;