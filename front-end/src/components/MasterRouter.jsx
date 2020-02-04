import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../utils/PrivateRoute';

import Login from './Login';
import Register from './Register';
import Tickets from './Tickets';
import Ticket from './Ticket';

import Home from './Home';
import TestComp from './TestComp';

export default () => <>
    <Route exact path="/login" render={() => <Redirect to="/login/user" />} />
    <Route path="/login/*" component={Login} />
    <Route path="/register/*" component={Register}/>
    <Route exact path="/user/tickets" component={Tickets}/>
    <Route exact path="/admin/tickets" component={Tickets}/>
    <PrivateRoute path="/home" component={Home} />

    {/* Tests */}
    <Route path="/test" component={TestComp}/>

    <Route 
        exact
        path='/user/tickets/:id' 
        render={props => <Ticket {...props} />} 
    />
    <Route 
        exact
        path='/admin/tickets/:id' 
        render={props => <Ticket {...props} />} 
    />
    </>