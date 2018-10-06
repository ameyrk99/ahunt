import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Layout from "./Layout"
import { HashRouter } from 'react-router-dom'

const app = document.getElementById('root')
ReactDOM.render(
    
    <HashRouter>
        <Layout />
    </HashRouter>

    , app);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


/*
Used HashRouter instead of BrowserRouter becuase i wanted to run the bundled js file locally.
and BrowserRouter does not work loaclly
*/