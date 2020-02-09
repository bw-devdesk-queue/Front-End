import React,{useState} from "react"
import {authIn} from "../actions/actions"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { toggleRoleType, getRole } from "../utils/utils"
import {FormWrapper,Form, FormTitle ,FormInput, ButtonGroup ,Button} from "./Styles/StyleWidgets"


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
        <FormWrapper>
      
           
            <Form onSubmit={handleSubmit}> 
            <FormTitle>Register </FormTitle>
             
                <FormInput name="full_name" type="text" placeholder="Full Name" value={userData.full_name} onChange={handleChange}/><br/><br/>
                <FormInput name="email" type="email" placeholder="Email" value={userData.email} onChange={handleChange}/><br/><br/>
                <FormInput name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange}/><br/><br/>
                <ButtonGroup>
                    <Button type="submit">Submit</Button>
                    <Button onClick={toggleRegistrationType}>{` ${oppositeRole} Register`}</Button>
                </ButtonGroup>
                
            </Form>
            
        
        </FormWrapper>
    );
 }

 export default Register;