import React from 'react';
import CollectionsItem from './CollectionsItem';
import cookie1 from '../images/home-cookie-01.png';
import cookie2 from '../images/home-cookie-02.png';
import cookie3 from '../images/home-cookie-03.png';

interface CollectionsProps {
  heading?: string
}

const Collections = (props: CollectionsProps): JSX.Element => (
  <section className="collections">
    <h2 className="title">{props.heading}</h2>
    <CollectionsItem img={cookie1} 
    alt="Sugar free cookies" 
    title="Yummy sugar free cookies" 
    width="425px" />
    <CollectionsItem img={cookie2} 
    alt="Keto cookies" 
    title="Keto friendly cookies" 
    width="425px" />
    <CollectionsItem img={cookie3} 
    alt="Millet cookies" 
    title="Healthy gluten-free millet cookies" 
    width="425px" />
  </section>
)

export default Collections;