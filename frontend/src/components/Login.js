import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Cookies  from 'universal-cookie'
import { useContext } from 'react'
import contextAddress from '../context/WebContext'
import { Link } from 'react-router-dom'

const Login = () => {
    const context = useContext(contextAddress)
    const { checkLogin, isLoggedIn } = context

    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({email: "", password: ""})

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
            credentials: 'include'
        })        


        const json = await response.json()
        
        if (json.success) {
            navigate("/")
        }
    }

    useEffect(()=>{
        if (isLoggedIn) {
            navigate("/")
        }
        //eslint-disable-next-line
    }, [isLoggedIn])

    useEffect(()=>{
        checkLogin()
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{ paddingTop: '6rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

            <h1>
                Login
            </h1>

            <form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={onSubmit}>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" onChange={onChange} aria-describedby='Enter email'/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={onChange} aria-describedby='Enter password'/>
                <input style={{margin: "1rem"}} type="submit" id="submit" value="submit"/>
            </form>
            <Link to="/signup">Signup</Link>

        </div>
    )
}

export default Login