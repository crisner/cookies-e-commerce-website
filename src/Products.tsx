import React from 'react';
import ProductsList from './ProductsList';

const Products = (props: {box: boolean}): JSX.Element => (
  <div className="products">
    <ProductsList box={props.box} />
  </div> 
)

export default Products;