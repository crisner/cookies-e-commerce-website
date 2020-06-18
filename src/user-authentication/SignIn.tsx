import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <div className="sign-in">
    <h2>Sign In</h2>
    <div className="form-container">
      <form className="form" action="" method="post">
        <label htmlFor="email">
          <h4>Email</h4>
          <input className="input-field" type="email" name="email" id="email" autoFocus={true} />
        </label>
        <label htmlFor="password">
          <h4>Password</h4>
          <input className="input-field" type="password" name="password" id="password" />
        </label>
        <button className="cta" type="submit">Sign In</button>
      </form>
      <div className="options">
        <p>Forgot your password?</p>
        <p><Link to="/signup">New user? Sign Up</Link></p>
      </div>
    </div>
    
  </div>
)

export default SignIn;