import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/Home/HomePage'


const Layout = () =>

    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/family' exact component={FamilyPage} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/events' exact component={Events} />
            <Route path='/resetpassword' exact component={ResetPassword} />
            <Route component={PageNotFound} />
        </Switch>
    </BrowserRouter>

export default Layout