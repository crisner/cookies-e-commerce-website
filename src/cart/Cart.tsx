import React from 'react';
import BoxItem from '../buildABox/BoxItem'

const Cart = (): JSX.Element => (
  <div className="cart">
    <h1>Cart</h1>
    <h4>Your cart is empty</h4>
   
    <div className="subtotal">
      <div className="subtotal-row">
        <span>Subtotal</span>
        <span>Rs'0.00'</span>
      </div>
      <div className="subtotal-row">
        <span>Shipping</span>
        <span>Rs'100.00'</span>
      </div>
    </div>
    <div className="total">
        <p>Total</p>
        <p>Rs'0.00'</p>
    </div>
    <button className="btn-add">Checkout</button>
  </div>
)

export default Cart;