import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Dashboard from "./components/Dashboard/Dashboard"
import CreateHunt from "./components/CreateHunt/CreateHunt"
import HuntSteps from "./components/HuntSteps/HuntsSteps"
import './bootstrap.css'

const Layout = () =>

    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/createhunt' exact component={CreateHunt} />
            <Route path='/huntsteps' exact component={HuntSteps} />
        </Switch>
    </BrowserRouter>

export default Layout