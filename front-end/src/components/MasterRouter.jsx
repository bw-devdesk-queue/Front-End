import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Tickets from './Tickets';
import Ticket from './Ticket';

export default () => <>
    <Route path="/login/user" component={Login} />
    <Route path="/login/admin" component={Login} />
    <Route path="/register" component={Register}/>
    <Route exact path="/user/tickets" component={Tickets}/>
    <Route exact path="/admin/tickets" component={Tickets}/>
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
    </>;