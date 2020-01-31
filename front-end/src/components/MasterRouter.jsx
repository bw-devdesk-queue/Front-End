import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Tickets from './Tickets';

export default () => <>
    <Route path="/login/user" component={Login} />
    <Route path="/login/admin" component={Login} />
    <Route path="/register" component={Register}/>
    <Route path="/tickets" component={Tickets}/>
    </>;