import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import "./assets/css/bootstrap.css"
import "./assets/vendors/iconly/bold.css"
import "./assets/vendors/perfect-scrollbar/perfect-scrollbar.css"
import "./assets/vendors/bootstrap-icons/bootstrap-icons.css"
import "./assets/css/app.css"
import "./assets/css/custom.css"


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
