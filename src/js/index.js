import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd';
import 'antd/dist/antd.css';

const app = document.getElementById('root')
ReactDOM.render(
   <div>
       Olivier is Awesome

       <Button type="primary">Button</Button>
   </div>

    , app);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


/*
Used HashRouter instead of BrowserRouter becuase i wanted to run the bundled js file locally.
and BrowserRouter does not work loaclly
*/