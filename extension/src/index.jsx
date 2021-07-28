// React
import React from 'react';
import ReactDOM from 'react-dom';

// Chrome
import { Router } from 'react-chrome-extension-router';

//import main css
import './index.css';
import App from './App';
 

//environment variables - https://www.npmjs.com/package/dotenv
require('dotenv').config();


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


