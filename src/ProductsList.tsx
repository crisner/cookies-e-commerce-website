import React from 'react';
import ProductListItem from './ProductListItem';
import data from '../public/products.json';

const ProductsList = () => (
  <>
    {data.map(product => <ProductListItem name={product.name} 
    image={product.image} 
    amount={product.amount} 
    quantity={product.quantity} 
    description={product.description} />)}
  </>
)

export default ProductsList;