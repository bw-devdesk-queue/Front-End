import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../utils/PrivateRoute';

import Login from './Login';
import Register from './Register';
import Tickets from './Tickets';
import Ticket from './Ticket';
import UserHome from "./UserHome";
import Home from './Home';
import TestComp from './TestComp';
import TicketForm from "./AddTicket"
import UpdateForm from "./UpdateTicket"
import GetSpecificTicket from "./GetSpecificTicket"
import Dashboard from "./Dashboard"
import StudentTabs from "./StudentTabs"
import AdminTabs from "./AdminTabs"


export default (props) => <>

    <Switch>
        {/* <Dashboard/> */}
        {/* <StudentTabs/> */}
        {/* <AdminTabs/> */}
        {/* <Route path='/' component={Dashboard} /> */}
        {/* // <PrivateRoute exact path='/' component={Tickets} /> */}
        
        <Route exact path="/login" render={() => <Redirect to="/login/user" />} />
        <Route path="/login/*" component={Login} />
        <Route path="/register/*" component={Register}/>
        <PrivateRoute exact path="/user/tickets" component={Tickets}/>
        <Route exact path="/admin/tickets" component={Tickets}/>
        <Route exact path="/home" component={Home} />
        <PrivateRoute exact path="/home/user/:id" component={UserHome}/>
        <Route path="/home/user/:id/add-ticket" component={TicketForm}/>
        
        <Route  path="/home/user/:id/ticket/:id" component={GetSpecificTicket}/>
        <Route exact path="/home/user/:id/ticket/:id" component={UpdateForm}/>

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
    </Switch>
    </>