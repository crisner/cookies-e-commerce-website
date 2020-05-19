import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Header = (): JSX.Element => (
  <header>
    <div className="top">
      <div className="logo">
        <img src="../public/images/logo-cookiefill.svg" width="140px" alt="logo" />
      </div>
      <div className="links">
        <FontAwesomeIcon icon={faSearch} />
        <a href="#" role="button">Sign in</a>
        <FontAwesomeIcon icon={faShoppingBag} />
      </div>
    </div>
    <ul className="menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">Cookies</a></li>
      <li><a href="#">Build your own box</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </header>
)

export default Header;