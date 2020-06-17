import React from 'react';
import { useHistory } from "react-router-dom";

const Hero = () : JSX.Element => {
  const history = useHistory();
  return (
    <div className="hero">
      <h2>Delight your tastebuds to cookies that are as light as clouds ands tastes like heaven!</h2>
      <button className="cta" onClick={() => history.push('/cookies')}>SHOP NOW</button>
    </div>
  )
}

export default Hero;