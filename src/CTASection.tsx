import React from 'react';

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


const CTASection = (props: CTAProps) => (
  <section className={props.class} 
  style={props.background ? ({backgroundImage: `url(${props.background})`, backgroundSize: 'cover'}) : ({backgroundColor: props.backgroundColor})}>
    {props.image ? <img className="image" src={props.image} alt={props.imageAlt} /> : null}
    <h2 className="text">{props.text}</h2>
    {props.buttonText ? (<button className="cta">{props.buttonText}</button>) : null}
    
  </section>
)

export default CTASection;