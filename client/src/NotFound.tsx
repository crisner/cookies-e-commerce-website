import React from 'react';
import { Link } from 'react-router-dom';
import cookie from './images/broken-cookie.png'; 

const NotFound = (): JSX.Element => (
  <div className="not-found" style={{margin: '6rem', textAlign: 'center'}}>
    <h1>Not Found</h1>
    <img src={cookie} width="412px" alt="An image of a half eaten cookie" style={{margin: '2rem'}} />
    <p style={{fontSize: '1.6rem', fontWeight: 'bold'}}>The page you are looking for cannot be found</p>
    <Link to="/" style={{
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#4f4741'
    }}>Take me home</Link>
  </div>
)

export default NotFound;