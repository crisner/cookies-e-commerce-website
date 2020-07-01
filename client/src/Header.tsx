import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';

const Header = (props): JSX.Element => {
  const [dropdown, addDropdown] = useState(false);
  return (
    <header>
      {console.log(props)}
      <div className="top">
        <div className="logo">
          <img src="src/images/logo-cookiefill.svg" width="140px" alt="logo" />
        </div>
        <div className="links">
          <FontAwesomeIcon icon={faSearch} />
          <FontAwesomeIcon icon={faUser} onClick={() => addDropdown(!dropdown)} />
          <Link to="/cart"><FontAwesomeIcon icon={faShoppingBag} /></Link>
        </div>
      </div>
      {dropdown ? (!props.auth.auth ? (
      <Dropdown id={'user-signin'} data={{'Sign In': '/signin'}} />
      ) : (
        <Dropdown id={'user-menu'} data={{
          'Edit profile': '/',
          'My account': '/',
          Orders: '/',
          Logout: '/api/logout'
          }} />
      )) : null}
      
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cookies">Cookies</Link></li>
        <li><Link to="/build-a-box">Build your own box</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </header>
  )
}

export default Header;