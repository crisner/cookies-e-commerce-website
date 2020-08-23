import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from './store';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import { logOut } from './store/auth/actions';

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const Header = (props: PropsFromRedux): JSX.Element => {
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
      {dropdown ? (!props.auth.loggedIn ? (
      <Dropdown id={'user-signin'} data={{'Sign In': '/signin'}} />
      ) : (
        <Dropdown id={'user-menu'} logOut={props.logOut} data={{
          'Edit profile': '/',
          'My account': '/',
          Orders: '/',
          Logout:''
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

export default connector(Header);