import React from 'react'
import { useEffect } from 'react';
import { callApi, routes } from '../routes';
import { Redirect } from 'react-router';

function Logout({ setIsLoggedIn }) {
    useEffect(() => {
        callApi(routes.logout).then(response => {
            console.log(response)
            setIsLoggedIn(false)
        }).catch(e => console.log(e))
    }, []);

    return <Redirect to='/' />
}

export default Logout
