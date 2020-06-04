import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Header = (): JSX.Element => (
  <header>
    <div className="top">
      <div className="logo">
        <img src="src/images/logo-cookiefill.svg" width="140px" alt="logo" />
      </div>
      <div className="links">
        <FontAwesomeIcon icon={faSearch} />
        <a href="#" role="button">Sign in</a>
        <FontAwesomeIcon icon={faShoppingBag} />
      </div>
    </div>
    <ul className="menu">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/cookies">Cookies</Link></li>
      <li><Link to="/build-a-box">Build your own box</Link></li>
      {/* <li><Link to="/">Contact</Link></li> */}
    </ul>
  </header>
)

export default Header;