import React from 'react';
import ProductListItem from './ProductListItem';
import data from '../public/products.json';

const ProductsList = (props: {box: boolean}): JSX.Element => (
  <>
    { props.box ? (
      data.products.box.map((product, index) => <ProductListItem id={`cookie-box-${index}`} 
      name={product.name} 
        image={product.image} 
        price={product.price} 
        type={product.type} 
        description={product.description} />)
      ) : (
      data.products.single.map((product, index) => <ProductListItem id={`cookie-single-${index}`} 
      name={product.name} 
      image={product.image} 
      price={product.price} 
      type={product.type} 
      description={product.description} />)
      )
    }
  </>
)

export default ProductsList;