import React from 'react';
import {Switch,Route,Redirect} from 'react-router';
import Home from '../components/home/Home';
import User from '../components/user/User';
const newLocal = <Redirect from='*' to='/' />;
export default props =>
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/users' component={User} />
    newLocal
</Switch>
