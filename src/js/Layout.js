import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/Home/HomePage'


const Layout = () =>

    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={HomePage} />
        </Switch>
    </BrowserRouter>

export default Layout