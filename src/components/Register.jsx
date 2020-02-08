import React,{useState} from "react"
import {authIn} from "../actions/actions"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { toggleRoleType, getRole } from "../utils/utils"
import styled from "styled-components"


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
     const FormWrapper = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     background: #444;
     background: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b') no-repeat center center fixed;
     // background: url('https://images.unsplash.com/photo-1485470733090-0aae1788d5af') no-repeat center center fixed;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     -o-background-size: cover;
     background-size: cover;
     height: 91.8vh;
 `
 const Form = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     border-radius: 18px;
     width: 30%;
     background-color: white;
     opacity: 0.9;
     z-index: 0;
     overflow: hidden;
     @media (max-width: 1200px) {
         width: 50%;
     }
     @media (max-width: 900px) {
         width: 80%;
     }
     @media (max-width: 600px) {
         width: 95%;
     }
     @media (max-width: 400px) {
         width: 100%;
     }
 `
 const FormTitle = styled.h1`
     display: flex;
     justify-content: center;
     align-items: center;
     font-weight: bold;
     font-size: 3.5rem;
     color: #444;
     opacity: 1;
     @media (max-width: 1200px) {
         // font-size: 2.5rem;
     }
 `
 const FormInput = styled.input`
     padding: 4%;
     margin: 2% 0%;
     border: none;
     -webkit-border-radius:5px;
     -moz-border-radius:5px;
     border-radius: 25px;
     -webkit-box-shadow: 0 0 4px #333 inset;
     -moz-box-shadow: 0 0 4px #333 inset;
     box-shadow: 0 0 4px #333 inset;
     text-indent: 5px;
     width: 80%;
     background: lightgray;
     color: black;
     font-size: 1.2rem;
     &:focus {
         outline: none;
         box-shadow: 0 0 8px 2px #444;
     }
 `
 const ButtonGroup = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     height: 50%;
     margin-bottom: 2%;
 `
 const Button = styled.button`
     display: flex;
     justify-content: center;
     align-items: center;
     margin: 2%;
     padding: 5%;
     overflow: hidden;
     white-space: wrap;
     background: #333;
     color: #fff;
     outline: 0;
     font-size: 0.9rem;
     border-radius: 5px;
     height: 4rem;
     width: 7rem;
     @media (max-width: 1200px) {
         height: 3rem;
         width: 5rem;
         font-size: 0.8rem;
     }
 `

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