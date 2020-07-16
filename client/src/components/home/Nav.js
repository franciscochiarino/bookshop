import React, { useState } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom'

function Nav({ user, setLogin, openSignUp, history }) {
  const [mobileNav, setMobileNav] = useState('mobileNavClose');
  const handleMobileNav = () => {
    mobileNav === 'mobileNavOpen' ? setMobileNav('mobileNavClose') : setMobileNav('mobileNavOpen');
  };

  const handleMobileNavAndLogin = () => {
    handleMobileNav();
    setLogin(true);
  }

  const handleMobileNavAndSignUp = () => {
    handleMobileNav();
    openSignUp();
  }

  const goToPreviousPage = () => {
    history.goBack();
  };

  return (
    <>
      <button id="menuBtn" onClick={handleMobileNav}>Menu</button>
      <button id="backBtn" onClick={goToPreviousPage}>Back</button>
      <nav className={mobileNav}>
        <div className="navLinks">
            <button id="closeNavBtn" onClick={handleMobileNav}>close</button>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/' exact={true} >HOME</NavLink>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/books/favorites'>FAVORITES</NavLink>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/books/fiction'>FICTION</NavLink>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/books/mystery'>MYSTERY</NavLink>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/books/tech'>TECH</NavLink>
            <NavLink className="navLink" activeClassName="navActive" onClick={handleMobileNav} to='/books/biography'>BIOGRAPHY</NavLink>
        </div>
        <div className="navButtons">
            {user && user.email ? 
                <button onClick={handleMobileNav} className="userLink"><Link to='/users/user'>ACCOUNT</Link></button> : 
                <button onClick={handleMobileNavAndLogin} className="userLink">LOG IN</button>
            }
            <button className="userLink" onClick={handleMobileNavAndSignUp}>SIGN UP</button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Nav);