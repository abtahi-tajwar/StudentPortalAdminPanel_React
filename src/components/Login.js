import React from 'react'
import { useState, useEffect } from 'react';
import { postFormValue, routes, setAuthToken, setId, setType, setUname } from '../routes';

function Login({ setIsLoggedIn }) {

    const [input, setInput] = useState({
        uname: "abtahi-tajwar",
        password: "StudentPortal1!"
    });
    const [error, setError] = useState(null);
    const handleInput = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    useEffect(() => {
        if(error !== null) {
            setTimeout(() => {
                setError(null)
            }, 2000)
        }
    },[error])
    const handleSubmit = (e) => {
        e.preventDefault();
        postFormValue(routes.login, input).then(response => {
                if(response.hasOwnProperty("error")) {
                    setError(response.error)
                } else {
                    if(response.type !== 'admin' && response.type !== 'moderator' ) {
                        setError("Unable to access!")
                    } else {
                        setAuthToken(`Bearer ${response.token}::${response.id}`)
                        setType(response.type)
                        setUname(response.uname)
                        setId(response.id)
                        setIsLoggedIn(true)
                    }                    
                }
            }    
        )
    }
    return (
        <div>
          <div className="sidenav">
            <div className="login-main-text">
                <h2>Student Portal Admin Panel</h2>
                <p>Login or register from here to access.</p>
            </div>
          </div>
          <div className="main">
            <div className="col-md-6 col-sm-12">
                <div className="login-form">
                  <form onSubmit={handleSubmit} className="mb-3">
                      <div className="form-group">
                        <label>User Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="User Name"
                            id="uname" 
                            value={input.uname}
                            onChange={handleInput}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password"
                            id="password" 
                            value={input.password}
                            onChange={handleInput}
                        />
                      </div>
                      <button type="submit" className="btn btn-black">Login</button>
                  </form>
                  {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                </div>
            </div>
          </div>
        
        </div> 
    )
}

export default Login
