import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../store';
import { registerUser } from '../store/auth/actions';
import { getErrorMessage } from '../store/auth/selectors';
import useForm from '../utils/useForm';

const mapStateToProps = (state: AppState) => {
  const signUpError = getErrorMessage(state);
  return {
    error: {signUpError}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userInfo, history) => dispatch(registerUser(userInfo, history))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SignUp = ({registerUser, error}: PropsFromRedux): JSX.Element => {
  const history = useHistory();
  const signupInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  const submit = () => {
    console.log('submitted', values)
    // registerUser(signupInfo, history);
  }
  const { values, handleChange, handleSubmit } = useForm(signupInfo, submit);
  console.log('values signup:', values)
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
            <input className="input-field" type="text" name="firstName" id="firstName"
            onChange={ handleChange }
            // @ts-ignore
            value={values.firstName && values.firstName} />
          </label>
          <label htmlFor="lastname">
            <h4>Last Name</h4>
            <input className="input-field" type="text" name="lastName" id="lastName"
            onChange={ handleChange }
            // @ts-ignore
            value={values.lastName && values.lastName} />
          </label>
          <label htmlFor="email">
            <h4>Email</h4>
            <input className="input-field" type="email" name="email" id="email" required
            onChange={ handleChange }
            // @ts-ignore
            value={values.email && values.email} />
          </label>
          <label htmlFor="password">
            <h4>Password</h4>
            <input className="input-field" type="password" name="password" id="password" required minLength={6}
            onChange={ handleChange }
            // @ts-ignore
            value={values.password && values.password} />
          </label>
          <button className="cta" type="submit">Create Account</button>
          <p>{error && error.signUpError}</p>
        </form>
      </div>
    </div>
  )
}

export default connector(SignUp);