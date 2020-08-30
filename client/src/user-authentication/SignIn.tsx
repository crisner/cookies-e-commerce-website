import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store';
import { signIn } from '../store/auth/actions';
import { getErrorMessage } from '../store/auth/selectors';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../utils/useForm';

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
  const userCredentials = {
    email: '',
    password: ''
  };

  const requiredFields = {
    email: true,
    password: true
  }
  const submit = () => {
    console.log('submitted', values);
    signIn(values, history)
  }
  const { values, handleChange, handleSubmit, errors } = useForm(userCredentials, requiredFields, submit);
  console.log('values:', values)

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <div className="form-container">
        <form className="form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input className="input-field" 
            type="email" name="email" id="email"
            onChange={ handleChange }
            // @ts-ignore
            value={values.email && values.email} />
          </label>
          {
            // @ts-ignore
            errors.email && <p>{errors.email}</p>
          }
          <label htmlFor="password">
            <h4>Password</h4>
            <input className="input-field" 
            type="password" name="password" id="password"
            onChange={ handleChange }
            // @ts-ignore
            value={values.password && values.password} />
          </label>
          {
            // @ts-ignore
            errors.password && <p>{errors.password}</p>
          }
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