import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// Styled components
import styled from 'styled-components';
// State Management
import { useDispatch } from 'react-redux';
import { authIn, logout } from '../actions/actions';
// Custom utils
import { getRole, toggleRoleType } from '../utils/utils';
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
const Login = () => {
    // Utility Hooks
    const history = useHistory();
    const dispatch = useDispatch();
    // Component State
    const [loginData, setLoginData] = useState({email: '', password: '', role: ''});
    // Login-Type Constants
    const rolePath = getRole(useParams()[0]);
    const oppositeRole = rolePath === 'admin' ? 'user' : 'admin'
    
    useEffect( () => {
        dispatch(logout)
    }, []);
    // Handler Functions
    const toggleLoginType = () => toggleRoleType(rolePath, history);
    const handleChange = event => {
        setLoginData(
            {...loginData, [event.target.name]: event.target.value}
        );
    }
    const handleSubmit = event => {
        event.preventDefault();
        dispatch(authIn({...loginData, role: rolePath}, history));
        setLoginData({
            email: '',
            password: ''
        });
    }
    const checkForSubmit = event => event.key === 'Enter' ? handleSubmit(event) : null;
    // View
    return (
        <>
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormTitle>{rolePath[0].toUpperCase() + rolePath.slice(1)} Login</FormTitle>
                <FormInput type="text" onChange={handleChange} value={loginData.email} name="email" placeholder="Email"></FormInput>
                <FormInput type="password" onKeyPress={checkForSubmit} onChange={handleChange} value={loginData.password} name="password" placeholder="Password"></FormInput>
                <ButtonGroup>
                    <Button onClick={handleSubmit} type="submit">Login</Button>
                    {/* Style this button to look like a toggle? */}
                    <Button onClick={toggleLoginType}>{oppositeRole[0].toUpperCase() + oppositeRole.slice(1)} Login</Button>
                </ButtonGroup>
            </Form>
        </FormWrapper>
        </>
    );
}
export default Login;
