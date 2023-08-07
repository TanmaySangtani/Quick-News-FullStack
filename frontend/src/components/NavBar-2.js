import React from 'react'
import logo from './logo.png'
import {
  Link
} from "react-router-dom"
import loginbutton from './loginbutton.png'
import contextAddress from '../context/WebContext'
import { useContext } from 'react'

const NavBar2 = () => {
  const context = useContext(contextAddress)
  const {isLoggedIn, logout} = context

    return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top" style={{padding: '0px', zIndex: '1'}}>
          <ul className="container-fluid" style={{boxSizing: 'content-box', listStyle: 'none', padding: '0px', margin: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            <li style={{marginLeft: '0.5rem'}}>
              <button style={{fontSize: '2rem', background: 'transparent', border: 'none', padding: '0'}}>
                <i className="fa-solid fa-bars" style={{color: '#ffffff', filter: 'opacity(0)'}}></i>
              </button>
            </li>
            <li style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Link className="navbar-brand" to="/"><img src={logo} alt="Quick News" width = "220rem" height = "70rem"/></Link>
            </li>
            <li style={{marginRight: '0.5rem'}}>
            {!isLoggedIn &&
            <Link to="/login" style={{ color: 'white', fontSize: '1.5rem', background: 'transparent', border: 'none', padding: '0'}}>
              <img src={loginbutton} style={{width: '3.5rem', height: '3rem'}} alt="" />
            </Link>
            }
            {isLoggedIn &&
            <button onClick={logout} style={{ color: 'white', fontSize: '1.5rem', background: 'transparent', border: 'none', padding: '0'}}>
              Logout
            </button>
            }
            </li>
          </ul>
      </nav>
    </div>
  )
}

export default NavBar2