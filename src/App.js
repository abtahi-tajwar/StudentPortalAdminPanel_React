import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AllUsers from "./pages/users/AllUsers";
import AllPosts from "./pages/posts/AllPosts";
import CreatePost from "./pages/posts/CreatePost";

function App() {

  const [pageName, setPageName] = useState('Dashboard');
  
  return (
    <Router>
      <div id="app">
        <Sidebar />
        <div id="main">
          <header className="mb-3">
              <a href="#" className="burger-btn d-block d-xl-none">
                  <i className="bi bi-justify fs-3"></i>
              </a>
          </header>
          <div className="page-heading">
              <h3>{ pageName }</h3>
          </div>
          <div className="page-content"> 
            <Switch>
              <Route path="/" exact> 
                <Dashboard setPageName={setPageName}/>
              </Route>  
              <Route path="/posts/all" exact>
                <AllPosts setPageName={setPageName} />
              </Route>
              <Route path="/posts/create" exact>
                <CreatePost setPageName={setPageName} />
              </Route>
              <Route path="/users/all" exact> 
                <AllUsers setPageName={setPageName}/>
              </Route> 
            </Switch>        
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
