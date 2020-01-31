import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
//import { axiosWithAuth } from '../utils/utils';

// State Management
import { useDispatch } from 'react-redux';
import { login } from '../actions/actions';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const rolePath = useRouteMatch().path.match(/admin/) ? 'admin' : 'user';
    const oppositeRole = rolePath === 'admin' ? 'user' : 'admin';
    

    const [loginData, setLoginData] = useState({username: '', password: ''});

    const toggleLoginType = () => history.push(`/login/${oppositeRole}`);

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
        <h3>{rolePath[0].toUpperCase() + rolePath.slice(1)} Login</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={loginData.username} name="username" placeholder="Username"></input>
                <input type="password" onChange={handleChange} value={loginData.password} name="password" placeholder="Password"></input>
                <input type="submit"></input>
            </form>
        {/* Style this button to look like a toggle? */}
        <button onClick={toggleLoginType}>Switch To {oppositeRole[0].toUpperCase() + oppositeRole.slice(1)} Login</button>
        </>
    );

}

export default Login;