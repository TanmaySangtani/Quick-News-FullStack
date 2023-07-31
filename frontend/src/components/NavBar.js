import React from 'react'
import {useState, useEffect} from 'react'
import logo from './logo.png'
import {
  Link
} from "react-router-dom"
import './navbar-styles.css'

const NavBar = (props) => {
  const [time, setTime] = useState(new Date ())

  const updateTime = async () =>{
    let dt = new Date()

    setTime(dt)
    // console.log(time.toLocaleString().toUpperCase() )
  }

  useEffect(() => {
    updateTime()
    setInterval(updateTime, 1000)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown" style={{flexGrow: 0}}>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" style={{color: 'white', fontSize: '1.2em'}} to="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {props.category}
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark position-absolute" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/">General</Link></li>
                  <li><Link className="dropdown-item" to="/business">Business</Link></li>
                  <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                  {/* <li><Link className="dropdown-item" to="/health">Health</Link></li> */}
                  <li><Link className="dropdown-item" to="/science">Science</Link></li>
                  <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                  <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                </ul>
              </li>
            </ul>
          </div>
          <Link className="navbar-brand" to="/"><img src={logo} alt="Quick News" width = "220rem" height = "70rem"/></Link>
          <div style={{color: 'white', fontSize: '0.7em'}}>{time.toLocaleString().substring(0,9).toUpperCase()}<br/><br/>{time.toLocaleString().substring(10).toUpperCase()}</div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar