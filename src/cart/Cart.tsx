import React from 'react';
import { connect } from 'react-redux';
import BoxItem from '../buildABox/BoxItem';
import { AppState } from '../store';
import { CartState } from '../store/cart/types';
import { getBoxesInCart, getCustomBoxesInCart } from '../store/cart/selectors';
import { removeCustomBox } from '../store/cart/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

type PropsFromCartState = CartState;

interface Props extends PropsFromCartState {
  removeCustomBox: (key: string) => any
}

const Cart = ({itemsInCart, removeCustomBox}: Props): JSX.Element => {

  const customBoxes = Object.entries(itemsInCart.customBoxes);
  let subTotal = 0;
  
  return (
    <div className="cart">
      <h1>Cart</h1>
      <h4>Your cart is empty</h4>

      {itemsInCart.boxes && itemsInCart.boxes.length ? 
      itemsInCart.boxes.map((item, index) => {
        subTotal = subTotal + item.price;
        return <BoxItem key={item.id + index} selectedItem={item} />
      }) : null}

      {customBoxes && customBoxes.length ? 
      customBoxes.map(([key, value], index) => {
        subTotal = subTotal + value.total;
        return (
          <div key={key}>
            <p style={{fontSize: '1.3rem'}}>Custom Box {index + 1}</p>
            <FontAwesomeIcon className="product-remove" icon={faTrashAlt} 
            onClick={() => removeCustomBox(key)} />
            {value.cartItems.map((item, index) => <BoxItem key={item.id + index} selectedItem={item} disableDelete={true} />)}
          </div>);
      }): null}
      
      <div className="subtotal">
        <div className="subtotal-row">
          <span>Subtotal</span>
          <span>Rs.{subTotal.toFixed(2)}</span>
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

const mapDispatchToProps = dispatch => {
  return {
    removeCustomBox: (key: string) => dispatch(removeCustomBox(key))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);