import React from 'react';
import { connect } from 'react-redux';
import { addPiece } from '../store/boxBuilder/actions';
import { addToCart } from '../store/cart/actions';
import { SelectedPiece } from '../store/boxBuilder/types';
import { CartItem } from '../store/cart/types';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductControls from './ProductControls';

interface ModalPropTypes {
  id: string,
  inputId: string,
  name: string,
  image: string,
  price: number,
  type: string,
  description: string,
  selectedQuantity: number,
  handler?: object,
  closeModal: object
}

interface Props extends ModalPropTypes {
  addPiece: (pieceDetails: SelectedPiece) => any
  addToCart: (item: CartItem) => any
}

const ProductDescriptionModal = (props:Props): JSX.Element => {
  const closeModal = props.closeModal;
  const handler = props.handler;
  return (
    <>
      <div className="modal-bg" id={'modal-bg' + props.id} onClick={() => {
        if(typeof closeModal === 'function') {
          closeModal();
        } else {
          throw new Error('Expected closeModal prop to be a function.');
        }
      }}></div>
      <div className="modal" id={'modal' + props.id}>
        <div className="modal-close"><FontAwesomeIcon icon={faTimes} onClick={() => {
          if(typeof closeModal === 'function') {
            closeModal();
          } else {
            throw new Error('Expected closeModal prop to be a function.');
          }
        }} /></div>
        <div className="modal-image" style={{backgroundImage: `url(${props.image})`}}>
        </div>
        <div className="modal-content">
          <h3 className="product-title">{props.name}</h3>
          <p className="product-description">{props.description}</p>
          <div className="product-details">
            <ProductControls inputId={props.inputId} 
            type={props.type} price={props.price} 
            quantity={props.selectedQuantity} handler={handler} />
            <button className="btn-add" onClick={() => {
              if(props.type === 'pc') {
                props.addPiece({
                  id: uuidv4(),
                  name: props.name,
                  image: props.image,
                  price: props.price * props.selectedQuantity,
                  perUnitPrice: props.price,
                  quantity: props.selectedQuantity,
                  type: props.type
                })
              } else {
                props.addToCart({
                  id: uuidv4(),
                  name: props.name,
                  image: props.image,
                  price: props.price * props.selectedQuantity,
                  perUnitPrice: props.price,
                  quantity: props.selectedQuantity,
                  type: props.type
                })
              }
            }}>Add</button>
          </div>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addPiece: (pieceDetails: SelectedPiece) => dispatch(addPiece(pieceDetails)),
    addToCart: (item: CartItem) => dispatch(addToCart(item))
  }
}

export default connect(null, mapDispatchToProps)(ProductDescriptionModal);