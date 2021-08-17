import React from 'react'
import { useState, useEffect } from 'react'
import { postFormValue, routes, callApi } from '../../routes'

function WebsiteInfo({ setPageName }) {
    setPageName("Website Info")
    const [input, setInput] = useState({
        name: "",
        about: "",
        email: ""
    })
    useEffect(() => {
        callApi(routes.getWebsiteInfo).then(data => {
            setInput(data)
        })
    }, [])
    useEffect(() => {
        console.log(input)
    })
    const handleInput = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postFormValue(routes.updateWebsiteInfo, input).then(response => console.log(response))
    }
    
    return (
        <div>
            <div className="col-md-6 col-12">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="website-name" class="form-label">Name</label>
                        <input 
                            type="text" 
                            value={input.name}
                            onChange={handleInput}
                            class="form-control" 
                            id="name" 
                            name="website-name"
                         />
                    </div>
                    <div class="mb-3">
                        <label for="website-about" class="form-label">About</label>
                        <textarea 
                            class="form-control" 
                            name="website-about" 
                            id="about" 
                            rows="3"
                            onChange={handleInput}
                            value={input.about}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="website-email" class="form-label">Website Email</label>
                        <input 
                            type="text" 
                            value={input.email}
                            onChange={handleInput}
                            class="form-control" 
                            id="email" 
                            name="website-email" 
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                    </form>
            </div>
        </div>
    )
}

export default WebsiteInfo
