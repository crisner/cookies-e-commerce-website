import React from 'react';
import { connect } from 'react-redux';
import BoxItem from '../buildABox/BoxItem';
import { AppState } from '../store';
import { CartState } from '../store/cart/types';
import { getBoxesInCart, getCustomBoxesInCart } from '../store/cart/selectors';

type Props = CartState;

const Cart = ({itemsInCart}: Props): JSX.Element => {

  const customBoxes = Object.entries(itemsInCart.customBoxes);
  
  return (
    <div className="cart">
      <h1>Cart</h1>
      <h4>Your cart is empty</h4>

      {itemsInCart.boxes && itemsInCart.boxes.length ? 
      itemsInCart.boxes.map((item, index) => <BoxItem key={item.id + index} selectedItem={item} />) : null}

      {customBoxes && customBoxes.length ? 
      customBoxes.map(([key, value], index) => {
        return (
          <div key={key}>
            <p style={{fontSize: '1.3rem'}}>Custom Box {index + 1}</p>
            {value.map((item, index) => <BoxItem key={item.id + index} selectedItem={item} />)}
          </div>);
      }): null}
      
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
}

const mapStateToProps = (state: AppState) => {
  const boxes = getBoxesInCart(state);
  const customBoxes = getCustomBoxesInCart(state);
  return {
    itemsInCart: {
      ...state.cart.itemsInCart,
      boxes,
      customBoxes
    }
  }
}

export default connect(mapStateToProps)(Cart);