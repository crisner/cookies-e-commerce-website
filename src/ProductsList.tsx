import React from 'react';
import ProductListItem from './ProductListItem';
import data from '../public/products.json';

const ProductsList = (props: {box: boolean}): JSX.Element => (
  <>
    {
    data.products.map((product, index) => <ProductListItem id={`cookie-box-${index}`} 
    name={product.name} 
    image={product.image} 
    price={props.box ? product.boxPrice : product.price} 
    type={props.box ? 'box' : 'pc'} 
    description={product.description} />)
    }
  </>
)

export default ProductsList;