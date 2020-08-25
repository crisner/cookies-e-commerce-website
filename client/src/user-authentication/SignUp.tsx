import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../store';
import { registerUser } from '../store/auth/actions';

const mapStateToProps = (state: AppState) => {
  return state.auth;
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userInfo, history) => dispatch(registerUser(userInfo, history))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SignUp = ({registerUser}: PropsFromRedux): JSX.Element => {
  const history = useHistory();
  const [signupInfo, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    registerUser(signupInfo, history);
  }
  return (
    <div className="signup">
      <h2>New User</h2>
      
      <div className="form-container">
        <div className="alternate-sign-up">
          <h4>Sign up with Google or fill up the form to create a new account.</h4>
          <button className="cta" onClick={() => {
            window.location.pathname = "/auth/google";
          }}>Google</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="firstname">
            <h4>First Name</h4>
            <input className="input-field" type="text" name="firstname" id="firstname"
            onChange={e => setInfo({...signupInfo, firstName: e.target.value})}
            value={signupInfo.firstName} />
          </label>
          <label htmlFor="lastname">
            <h4>Last Name</h4>
            <input className="input-field" type="text" name="lastname" id="lastname"
            onChange={e => setInfo({...signupInfo, lastName: e.target.value})}
            value={signupInfo.lastName} />
          </label>
          <label htmlFor="email">
            <h4>Email</h4>
            <input className="input-field" type="email" name="email" id="email"
            onChange={e => setInfo({...signupInfo, email: e.target.value})}
            value={signupInfo.email} />
          </label>
          <label htmlFor="password">
            <h4>Password</h4>
            <input className="input-field" type="password" name="password" id="password"
            onChange={e => setInfo({...signupInfo, password: e.target.value})}
            value={signupInfo.password} />
          </label>
          {/* <label htmlFor="confirm-password">
            <h4>Confirm Password</h4>
            <input className="input-field" type="password" name="confirm-password" id="confirm-password" />
          </label> */}
          <button className="cta" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default connector(SignUp);