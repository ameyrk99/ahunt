import React from 'react'
import ReactDOM from 'react-dom'

const app = document.getElementById('root')
ReactDOM.render(
   <div>
       Olivier is Awesome
   </div>

    , app);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


/*
Used HashRouter instead of BrowserRouter becuase i wanted to run the bundled js file locally.
and BrowserRouter does not work loaclly
*/