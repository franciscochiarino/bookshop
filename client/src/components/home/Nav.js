import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <div>
          <NavLink className="navLink" activeClassName="navActive" to='/' exact={true} >HOME</NavLink>
          <NavLink className="navLink" activeClassName="navActive" to='/books/favorites'>FAVORITES</NavLink>
          <NavLink className="navLink" activeClassName="navActive" to='/books/fiction'>FICTION</NavLink>
          <NavLink className="navLink" activeClassName="navActive" to='/books/mystery'>MYSTERY</NavLink>
          <NavLink className="navLink" activeClassName="navActive" to='/books/tech'>TECH</NavLink>
          <NavLink className="navLink" activeClassName="navActive" to='/books/biography'>BIOGRAPHY</NavLink>
      </div>
      <div>
          {user && user.email ? 
              <button className="userLink"><Link to='/users/user'>ACCOUNT</Link></button> : 
              <button className="userLink" onClick={() => setLogin(true)}>LOG IN</button>
          }
          <button className="userLink" onClick={openSignUp}>SIGN UP</button>
      </div>
  </nav>
  )
}
