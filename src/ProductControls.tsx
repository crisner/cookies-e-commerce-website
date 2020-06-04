import React from 'react';

interface ProductControlsProps {
  inputId: string,
  price: number,
  quantity: number,
  handler: object,
  type: string
}

const ProductControls = (props: ProductControlsProps) => (
  <div className="product-details">
    <p className="product-cost">Rs.{props.price * props.quantity}</p>
    <div className="product-quantity">
    <input type="number" name={props.inputId} 
      id={props.inputId} min="1" max="18" 
      value={props.quantity}
      onChange={(e) => {
        if(typeof props.handler === 'function') {
          props.handler(Number(e.target.value))
        } else {
          throw new Error('Expected handler prop to be a function.');
        }
      }} />
    {props.type}
    {props.type === 'pc' && props.quantity > 1 ? 's' : (
      props.type === 'box' && props.quantity > 1 ? 'es' : ''
      )}</div>
    <button className="btn-add">Add</button>
  </div> 
)

export default ProductControls;