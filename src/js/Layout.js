import React from "react"
import { Route, BrowserRouter, Switch, HashRouter } from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Dashboard from "./components/Dashboard/Dashboard"
import Participant from './components/Participant/Participant'
import './bootstrap.css'
import DashboardProvider from "./components/Dashboard/DashboardProvider";

const DashboardLayout = () => <DashboardProvider> <Dashboard /> </DashboardProvider>

const Layout = () =>

    <HashRouter>
        <Switch>
            <Route path='/participant' exact component={Participant} />
            <Route path='/' exact component={HomePage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/dashboard' exact component={DashboardLayout} />
        </Switch>
    </HashRouter>

export default Layout