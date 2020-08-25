import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store';
import { signIn } from '../store/auth/actions';
import { getErrorMessage } from '../store/auth/selectors';
import { Link, useHistory } from 'react-router-dom';

const mapStateToProps = (state: AppState) => {
  const signInError = getErrorMessage(state);
  return {
    error: {signInError}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (values, history) => dispatch(signIn(values, history))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


const SignIn = ({signIn, error}:PropsFromRedux) => {
  const history = useHistory();
  const [userCredentials, setValues] = useState({
    email: '',
    password: ''
   })
   const handleSubmit = e => {
    e.preventDefault();
    signIn(userCredentials, history)
  }
  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input className="input-field" 
            type="email" name="email" id="email"
            onChange={ e => setValues( {...userCredentials, email: e.target.value})}
            value={userCredentials.email} />
          </label>
          <label htmlFor="password">
            <h4>Password</h4>
            <input className="input-field" 
            type="password" name="password" id="password"
            onChange={ e => setValues( {...userCredentials, password: e.target.value})}
            value={userCredentials.password} />
          </label>
          <button className="cta" type="submit">Sign In</button>
          <p>{error && error.signInError}</p>
        </form>
        <div className="options">
          <p>Forgot your password?</p>
          <p><Link to="/auth/signup">New user? Sign Up</Link></p>
        </div>
        <div className="alternate-sign-in">
          <p>or sign in with</p>
          <button className="cta" onClick={() => {
            window.location.pathname = "/auth/google";
          }}>Google</button>
        </div>
      </div>
    </div>
  )
}

export default connector(SignIn);