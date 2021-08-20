import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
import { useState /*, useRef*/ } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AllUsers from "./pages/users/AllUsers";
import AllPosts from "./pages/posts/AllPosts";
import CreatePost from "./pages/posts/CreatePost";
import AllCategories from "./pages/categories/AllCategories";
import User from "./pages/users/User";
import Roles from "./pages/roles/Roles";
import ModeratorRequests from "./pages/moderator_request/ModeratorRequests";
import WebsiteInfo from "./pages/website/WebsiteInfo";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { getType } from "./routes";
import InstructorRequest from "./pages/instructor_request/InsturctorRequest";


function App() {

  const [pageName, setPageName] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ?
        <Login setIsLoggedIn={setIsLoggedIn} /> :
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
                <h3>{pageName}</h3>
              </div>
              <div className="page-content">

                <Switch>
                  <Route path="/" exact>
                    <Dashboard setPageName={setPageName} />
                  </Route>
                  <Route path="/posts/all" exact>
                    <AllPosts setPageName={setPageName} />
                  </Route>
                  <Route path="/posts/create" exact>
                    <CreatePost setPageName={setPageName} />
                  </Route>
                  <Route path="/users/all" exact>
                    <AllUsers setPageName={setPageName} />
                  </Route>
                  <Route path="/users/user/:id" exact component={
                    ({ match }) => {
                      return <User setPageName={setPageName} match={match} />
                    }
                  }>
                  </Route>
                  <Route path="/users/change_role" exact>
                    <Roles setPageName={setPageName} />
                  </Route>
                  <Route path="/categories/all">
                    <AllCategories setPageName={setPageName} />
                  </Route>
                  {getType() === 'admin' &&
                    <Route path="/moderator_request">
                      <ModeratorRequests setPageName={setPageName} />
                    </Route>
                  }
                  {getType() === 'moderator' &&
                    <Route path="/instructor_request">
                      <InstructorRequest setPageName={setPageName} />
                    </Route>
                  }
                  {getType() === 'admin' &&
                    <Route path="/website_info">
                      <WebsiteInfo setPageName={setPageName} />
                    </Route>

                  }
                  <Route path="/logout">
                    <Logout setIsLoggedIn={setIsLoggedIn} />
                  </Route>
                </Switch>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </Router>
      }

    </div>
  );
}

export default App;
