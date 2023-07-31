import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import contextAddress from '../context/WebContext'
import { Link } from 'react-router-dom'

const Signup = () => {
    const context = useContext(contextAddress)
    const { checkLogin, isLoggedIn } = context
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({username: "", email: "", password: "", cpassword: ""})

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (credentials.password !== credentials.cpassword) {
            console.error("passwords dont match")
            return
        }

        if (credentials.username.length < 6 || credentials.password.length < 6) {
            console.error("Username and passwords must be atleast of 6 length")
            return
        }

        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: credentials.username, email: credentials.email, password: credentials.password})
        })        


        const json = await response.json()
        console.log(json)

        navigate("/login")
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
                Signup
            </h1>

            <form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={onSubmit}>
                <label htmlFor="username">User Name</label>
                <input type="text" id="username" name="username" onChange={onChange} aria-describedby='Enter username'/>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" onChange={onChange} aria-describedby='Enter email'/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={onChange} aria-describedby='Enter password'/>
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" id="cpassword" name="cpassword" onChange={onChange} aria-describedby='Enter password'/>
                <input style={{margin: "1rem"}} type="submit" id="submit" value="submit"/>
                {(credentials.password !== credentials.cpassword) && 
                <div style={{color: "red"}}>
                    Entered passwords do not match
                </div>
                }
                <Link to="/login">Login</Link>
            </form>

        </div>
    )
}

export default Signup