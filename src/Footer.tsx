import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer style={{backgroundColor: '#f0e9e2'}}>
    <div className="footer-container">
      <h3 className="text">Follow</h3>
      <div className="links">
        {/* <FontAwesomeIcon icon={faFacebook} /> */}
        <div className="circle">
        <FontAwesomeIcon icon={faFacebookF} style={{margin: '0 0.3rem'}} />
        </div>
        <div className="circle">
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <div className="circle">
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>
        <div className="circle">
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </div>
      <form action="" method="post">
        <label htmlFor="email">
          <h3 className="text">Sign up for news and offers</h3>
          <input className="input-field" type="email" name="email" id="subscribe" placeholder="Your email address" />
        </label>
        <input className="cta" type="button" value="Submit"/>
      </form>
  </footer>
)

export default Footer;