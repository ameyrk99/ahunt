import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Dashboard from "./components/Dashboard/Dashboard"


const Layout = () =>

    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/dashboard' exact component={Dashboard} />
        </Switch>
    </BrowserRouter>

export default Layout