import React from 'react';

const SignUp = (): JSX.Element => (
  <div className="signup">
    <h2>New User</h2>
    <div className="form-container">
      <form className="form" action="" method="post">
        <label htmlFor="firstname">
          <h4>First Name</h4>
          <input className="input-field" type="text" name="firstname" id="firstname" />
        </label>
        <label htmlFor="lastname">
          <h4>Last Name</h4>
          <input className="input-field" type="text" name="lastname" id="lastname" />
        </label>
        <label htmlFor="username">
          <h4>Username</h4>
          <input className="input-field" type="text" name="username" id="username" />
        </label>
        <label htmlFor="email">
          <h4>Email</h4>
          <input className="input-field" type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <h4>Password</h4>
          <input className="input-field" type="password" name="password" id="password" />
        </label>
        <label htmlFor="confirm-password">
          <h4>Confirm Password</h4>
          <input className="input-field" type="password" name="confirm-password" id="confirm-password" />
        </label>
        <button className="cta" type="submit">Create Account</button>
      </form>
    </div>
  </div>
)

export default SignUp;