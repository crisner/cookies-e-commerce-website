import React from 'react';
import Hero from './Hero';
import Collections from './Collections';
import CTASection from '../CTASection';
import box from '../images/box1.png';
import banner from '../images/banner.png';

const Home = () : JSX.Element => (
  <main>
    <Hero />
    <Collections heading="Browse our popular collections" />
    <div className="cta-container">
      <CTASection 
      redirectOnClick="build-a-box"
      class="build-a-box" 
      backgroundColor="#ce6d52" 
      image={box} 
      imageAlt="A picture of a custom cookie box" 
      text="Build your own cookie box" />
      <CTASection 
      class="order-now" 
      background={banner} 
      text="Pick your favourite cookies and get them delivered to your doorstep"
      buttonText="Order now" />
    </div>
  </main>
)

export default Home;