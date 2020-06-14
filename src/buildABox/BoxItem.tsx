import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store';
import { SelectedPiece } from '../store/boxBuilder/types';
import { CartItem } from '../store/cart/types';
import { removePiece, updatePieceQuantity } from '../store/boxBuilder/actions';
import { removeCartItem, updateCart } from '../store/cart/actions';
import { getSelectedPiece } from '../store/boxBuilder/selectors';
import { getBoxInCart } from '../store/cart/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state: AppState, ownProps: {selectedItem: SelectedPiece | CartItem}) => {
  const currentPiece = getSelectedPiece(state, ownProps.selectedItem.id);
  const currentCartItem = getBoxInCart(state, ownProps.selectedItem.id);
  const currentItem = currentPiece && currentPiece.length ? {currentItem: currentPiece} : {currentItem: currentCartItem};
  return currentItem;
}

const mapDispatchToProps = dispatch => {
  return {
    removePiece: (id: string, quantity: number) => dispatch(removePiece(id, quantity)),
    updatePieceQuantity: (id: string, quantity: number) => dispatch(updatePieceQuantity(id, quantity)),
    removeCartItem: (id: string, quantity: number) => dispatch(removeCartItem(id, quantity)),
    updateCart: (id: string, quantity: number) => dispatch(updateCart(id, quantity))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  selectedItem: SelectedPiece | CartItem
  currentItem: SelectedPiece[] | CartItem[]
  disableDelete?: boolean
}

const BoxItem = ({disableDelete, selectedItem, currentItem, removePiece, updatePieceQuantity, removeCartItem, updateCart}:Props): JSX.Element => (
  <div className="box-item">
    <div className="preview-img" style={{contain: 'content'}}>
      <img src={selectedItem.image} alt={`Image of ${selectedItem.name} cookies`} style={{width: '100%'}} />
    </div>
    <p className="product-name">{selectedItem.name}</p>
    <p className="selected-quantity">&#xD7; {currentItem[0].quantity}</p>
    <div className="edit-controls">
      <FontAwesomeIcon icon={faPlusSquare} 
      onClick={() => {
        selectedItem.type === 'pc' ? 
        updatePieceQuantity(selectedItem.id, selectedItem.quantity + 1) : 
        updateCart(selectedItem.id, selectedItem.quantity + 1)
      }} />
      <FontAwesomeIcon icon={faMinusSquare} 
      onClick={() => {
        selectedItem.type === 'pc' ? 
        updatePieceQuantity(selectedItem.id, 
        selectedItem.quantity > 1 ? selectedItem.quantity - 1 : 1) : 
        updateCart(selectedItem.id, 
        selectedItem.quantity > 1 ? selectedItem.quantity - 1 : 1)
      }} />
    </div>
    <p className="product-cost">Rs. {selectedItem.price.toFixed(2)}</p>
    {!disableDelete ?
    <FontAwesomeIcon className="product-remove" icon={faTrashAlt} onClick={() => {
      selectedItem.type === 'pc' ? 
      removePiece(selectedItem.id, selectedItem.quantity) :
      removeCartItem(selectedItem.id, selectedItem.quantity)
    }} /> :
    null }
  </div>  
)

export default connector(BoxItem);