import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// State Management
import { useDispatch } from 'react-redux';
import { authIn, logout } from '../actions/actions';
// Custom utils
import { getRole, toggleRoleType } from '../utils/utils';

import {FormWrapper,Form, FormTitle ,FormInput, ButtonGroup ,Button} from "./Styles/StyleWidgets"





const Login = () => {
    // Utility Hooks
    const history = useHistory();
    const dispatch = useDispatch();
    // Component State
    const [loginData, setLoginData] = useState({email: '', password: '', role: ''});
    // Login-Type Constants
    const rolePath = getRole(useParams()[0]);
    const oppositeRole = rolePath === 'admin' ? 'user' : 'admin'
    // Logout on mount
    
    useEffect( () => {
        dispatch(logout());
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