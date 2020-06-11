import React from 'react';

const Cart = (): JSX.Element => (
  <div className="cart">
    <h3>Cart</h3>
    <h4>1 item in your cart</h4>
    <div className="total">
        <p>Total</p>
        <p>Rs'0.00'</p>
    </div>
    <button className="btn-add">Checkout</button>
  </div>
)

export default Cart;