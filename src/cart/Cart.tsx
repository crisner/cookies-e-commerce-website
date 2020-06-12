import React from 'react';
import { connect } from 'react-redux';
import BoxItem from '../buildABox/BoxItem';
import { AppState } from '../store';
import { CartState } from '../store/cart/types';
import { getCartItems } from '../store/cart/selectors';

type Props = CartState;

const Cart = ({itemsInCart}: Props): JSX.Element => (
  <div className="cart">
    <h1>Cart</h1>
    <h4>Your cart is empty</h4>

    {itemsInCart && itemsInCart.length ? 
    itemsInCart.map((item, index) => <BoxItem key={item.id + index} selectedItem={item} />) : null}
   
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

const mapStateToProps = (state: AppState) => {
  const itemsInCart = getCartItems(state);
  return {
    itemsInCart
  }
}

export default connect(mapStateToProps)(Cart);