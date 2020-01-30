import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';

export default () => <>
    <Route path="/login/user" component={Login} />
    <Route path="/login/admin" component={Login} />
    </>;