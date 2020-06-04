import React from 'react';
import CollectionsItem from './CollectionsItem';

interface CollectionsProps {
  heading?: string
}

const Collections = (props: CollectionsProps): JSX.Element => (
  <section className="collections">
    <h2 className="title">{props.heading}</h2>
    <CollectionsItem img="src/images/home-cookie-01.png" 
    alt="Sugar free cookies" 
    title="Yummy sugar free cookies" 
    width="425px" />
    <CollectionsItem img="src/images/home-cookie-02.png" 
    alt="Keto cookies" 
    title="Keto friendly cookies" 
    width="425px" />
    <CollectionsItem img="src/images/home-cookie-03.png" 
    alt="Millet cookies" 
    title="Healthy gluten-free millet cookies" 
    width="425px" />
  </section>
)

export default Collections;