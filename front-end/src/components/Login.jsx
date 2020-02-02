import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// State Management
import { useDispatch } from 'react-redux';
import { authIn } from '../actions/actions';

// Custom utils
import { getRole, toggleRoleType } from '../utils/utils';

const Login = () => {
    // Utility Hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // Component State
    const [loginData, setLoginData] = useState({email: '', password: ''});

    // Login-Type Constants
    const rolePath = getRole(useParams()[0]);
    const oppositeRole = rolePath === 'admin' ? 'user' : 'admin'
    
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

    // View
    return (
        <>
        <h3>{rolePath[0].toUpperCase() + rolePath.slice(1)} Login</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={loginData.email} name="email" placeholder="Email"></input>
                <input type="password" onChange={handleChange} value={loginData.password} name="password" placeholder="Password"></input>
                <input type="submit"></input>
            </form>
        {/* Style this button to look like a toggle? */}
        <button onClick={toggleLoginType}>Switch To {oppositeRole[0].toUpperCase() + oppositeRole.slice(1)} Login</button>
        </>
    );

}

export default Login;