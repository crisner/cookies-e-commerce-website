import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const UserProfileEdit = (): JSX.Element => (
  <div className="user-profile-form">
    <h2>Edit Profile</h2>
    <div className="form-container">
      <div className="user-picture">
        <FontAwesomeIcon icon={faUserCircle} />
        <input type="file" name="profile-picture" id="profile-picture" accept=".jpg,.png"/>
      </div>
      <div className="user-details">
        <label htmlFor="firstname">
          <h4>First Name</h4>
          <input className="input-field" type="text" name="firstname" id="firstname"/>
        </label>
        <label htmlFor="lastname" style={{marginLeft: '1%'}}>
          <h4>Last Name</h4>
          <input className="input-field" type="text" name="lastname" id="lastname"/>
        </label>
      </div>
      <div className="user-details">
        <label htmlFor="email">
          <h4>Email</h4>
          <input className="input-field" type="email" name="email" id="email" />
        </label>
        <label htmlFor="phone" style={{marginLeft: '1%'}}>
          <h4>Phone number</h4>
          <input className="input-field" type="tel" name="phone" id="phone"/>
        </label>
      </div>
      <div className="address-section-1">
        <label htmlFor="addressLine1">
          <h4>Address Line 1</h4>
          <input className="input-field" type="text" name="addressLine1" id="addressLine1"/>
        </label>
        <label htmlFor="addressLine2">
        <h4>Address Line 2</h4>
          <input className="input-field" type="text" name="addressLine2" id="addressLine2"/>
        </label>
      </div>
      <div className="user-details">
        <label htmlFor="city">
          <h4>City</h4>
          <input className="input-field" type="text" name="city" id="city"/>
        </label>
        <label htmlFor="state" style={{marginLeft: '1%'}}>
          <h4>State</h4>
          <input className="input-field" type="text" name="state" id="state"/>
        </label>
      </div>
      <div className="user-details">
        <label htmlFor="pincode">
          <h4>Pin code</h4>
          <input className="input-field" type="text" name="pincode" id="pincode"/>
        </label>
        <label htmlFor="country" style={{marginLeft: '1%'}}>
          <h4>Country</h4>
          <input className="input-field" type="text" name="country" id="country"/>
        </label>
      </div>
      <button className="cta" type="submit">Save</button>
    </div>
  </div>
)

export default UserProfileEdit;