import React from 'react'
import './Navbar.scss'




export default function Navbar() {
  return (
        <nav>
          <div className='nav-wrapper navbar black'>
            <a href="/" className='brand-logo'>MERN ToDo App</a>
            <ul id="nav-mobile" className='right hide-on-med-and-down'>
                <li><a href="/login">Sign in</a></li>
            </ul>
          </div>
        </nav>
  )
}


