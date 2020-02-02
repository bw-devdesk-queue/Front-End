import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../utils/PrivateRoute';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import TestComp from './TestComp';

export default () => <>
    <Route exact path="/login" render={() => <Redirect to="/login/user" />} />
    <Route path="/login/*" component={Login} />
    <Route path="/register/*" component={Register}/>
    <Route path="/test" component={TestComp}/>
    <PrivateRoute path="/home" component={Home} />
    </>;