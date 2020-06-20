import React from 'react';
import { useHistory } from "react-router-dom";

interface CTAProps {
  background?: string,
  backgroundColor?: string,
  image?: string,
  imageAlt?: string,
  text: string,
  buttonText?: string,
  class?: string
  redirectOnClick?: string
}


const CTASection = (props: CTAProps) => { 
  const history = useHistory();
  return (
    <section className={props.class} 
    onClick={() => props.redirectOnClick ? history.push(`/${props.redirectOnClick}`) : null}
    style={props.background ? 
    ({backgroundImage: `url(${props.background})`, backgroundSize: 'cover'}) :
    ({backgroundColor: props.backgroundColor})}>
      {props.image ? <img className="image" src={props.image} alt={props.imageAlt} /> : null}
      <h2 className="text">{props.text}</h2>
      {props.buttonText ? 
      (<button className="cta" 
      onClick={() => history.push('/cookies')}>{props.buttonText}</button>) : null}
    </section>
  )
}

export default CTASection;