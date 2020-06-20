import React from 'react';
import ProductsList from './ProductsList';

const Products = (props: {box: boolean}): JSX.Element => (
  <div className="products" style={props.box ? {} : {width: '60vw', gridGap: '3rem'}}>
    <ProductsList box={props.box} />
  </div> 
)

export default Products;