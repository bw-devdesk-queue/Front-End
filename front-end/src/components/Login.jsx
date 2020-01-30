import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
//import { axiosWithAuth } from '../utils/utils';

// State Management
import { useDispatch } from 'react-redux';
import { login } from '../actions/actions';

const Login = () => {
    const history = useHistory();
    const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({username: '', password: ''});

    const handleChange = event => {
        setLoginData(
            {...loginData, [event.target.name]: event.target.value}
        );
    }

    const handleSubmit = event => {
        event.preventDefault();
    
        dispatch(login({...loginData, role: rolePath}));

        setLoginData({
            username: '',
            password: ''
        });
    }

    return (
        <>
        <h3>User Login</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={loginData.username} name="username" placeholder="Username"></input>
                <input type="password" onChange={handleChange} value={loginData.password} name="password" placeholder="Password"></input>
                <input type="submit"></input>
            </form>
        </>
    );

}

export default Login;