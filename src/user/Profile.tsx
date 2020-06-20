import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const UserProfile = (): JSX.Element => (
  <div className="user-profile">
    <h2>Profile<span><Link to="/editprofile"><FontAwesomeIcon icon={faEdit} /></Link></span></h2>
    <div className="user-picture">
      <FontAwesomeIcon icon={faUserCircle} />
    </div>
    <div className="information-container">
      <div className="primary-details">
          <div className="user-details">
            <h4>First Name</h4>
            <p>John</p>
          </div>
          <div className="user-details">
            <h4>Last Name</h4>
            <p>Doe</p>
          </div>
          <div className="user-details">
            <h4>Email</h4>
            <p>johndoe@jd.com</p>
          </div>
          <div className="user-details">
            <h4>Phone number</h4>
            <p>000-000-0000</p>
          </div>
      </div>
      <div className="address-information">
        <h4>Address</h4>
        <div className="address-section-1">
          <p>Address information like door number, apartment or building name goes here.</p>
          <p>Address information like street name goes here.</p>
        </div>
        <section className="address-section-2">
          <div className="user-details">
            <h4>City</h4>
            <p>City Name</p>
          </div>
          <div className="user-details">
            <h4>State</h4>
            <p>State name</p>
          </div>
        </section>
        <section className="address-section-3">
          <div className="user-details">
            <h4>Pin code</h4>
            <p>000000</p>
          </div>
          <div className="user-details">
            <h4>Country</h4>
            <p>India</p>
          </div>
        </section>
      </div>
    </div>
  </div>
)

export default UserProfile;