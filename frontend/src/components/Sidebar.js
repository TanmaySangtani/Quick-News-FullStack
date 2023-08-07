import React from 'react'
// import './sidebar-styles.css'
import { useState } from 'react'
import {
  Link
} from "react-router-dom"
import { useContext } from 'react'
import contextAddress from '../context/WebContext'

const Sidebar = () => {
  const context = useContext(contextAddress)
  const {isLoggedIn, logout} = context

  const [rot, setRot] = useState('bar-svg')
  const [contentHide, setContentHide] = useState('sidebar-hide')
  const [zeroWidth, setZeroWidth] = useState({width: '0vw', overflowY: 'visible'})
  
  
  const handleClick = () => {
    rotate()
    if (contentHide === '')
    {
      setZeroWidth({width: '0vw', overflowY: 'visible'})
      setContentHide('sidebar-hide')
    }
    else
    {
      setZeroWidth({overflowY: 'scroll'})
      setContentHide('')
    }
  }
  const rotate = () => {
    if (rot === 'bar-svg') {setRot('bar-svg-rotate')}
    else {setRot('bar-svg')}
  }
  return (
    <>
       {/* all sidebar css is custom made */}
      <nav className="custom-sidebar fixed-top" style={zeroWidth}>
        <ul className="sidebar-side">
        <li className={`side-logo`}>
          <div type="button" className="side-link">  
            <span className={`side-link-text side-logo-text ${contentHide}`}>Welcome</span> 
            <button onClick={handleClick} style={{ background: 'transparent', border: 'none', padding: '0'}}><i className={`fa-solid fa-bars ${rot} link-svg`} style={{color: '#ffffff'}}></i></button>
          </div>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/" className="side-link color-change">  
            <span className="side-link-text">General</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/business" className="side-link color-change">  
            <span className="side-link-text">Business</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/entertainment" className="side-link color-change">  
            <span className="side-link-text">Entertainment</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/science" className="side-link color-change">  
            <span className="side-link-text">Science</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/sports" className="side-link color-change">  
            <span className="side-link-text">Sports</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/technology" className="side-link color-change">  
            <span className="side-link-text">Technology</span>
          </Link>
        </li>
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/townsquare" className="side-link color-change">  
            <span className="side-link-text">Town Square</span>
          </Link>
        </li>
        {isLoggedIn &&
          <li className={`side-item child-link ${contentHide}`}>
            <Link to="/likedarticles" className="side-link color-change">  
              <span className="side-link-text">Liked Articles</span>
            </Link>
          </li>
        }
        {isLoggedIn &&
          <li className={`side-item child-link ${contentHide}`}>
            <Link to="/savedarticles" className="side-link color-change">  
              <span className="side-link-text">Saved Articles</span>
            </Link>
          </li>
        }
        <li className={`side-item child-link ${contentHide}`}>
          <Link to="/about" className="side-link color-change">  
            <span className="side-link-text">About</span>
          </Link>
        </li>
        {isLoggedIn &&
          <li className={`side-item child-link ${contentHide}`}>
            <Link to="/account" className="side-link color-change">  
              <span className="side-link-text">Account</span>
            </Link>
          </li>
        }
        {isLoggedIn &&
        <li className={`side-item child-link ${contentHide}`}>
          <button style={{background: 'transparent', border: 'none', width: "100%"}} onClick={logout} className="side-link color-change">  
            <span className="side-link-text">Logout</span>
          </button>
        </li>
        }
        {!isLoggedIn &&
          <li className={`side-item child-link ${contentHide}`}>
          <Link to="/login" className="side-link color-change">  
            <span className="side-link-text">Login</span>
          </Link>
          </li>
        }
        {!isLoggedIn &&
          <li className={`side-item child-link ${contentHide}`}>
          <Link to="/signup" className="side-link color-change">  
            <span className="side-link-text">Signup</span>
          </Link>
          </li>
        }
        </ul>
      </nav>
    </>
  )
}


export default Sidebar