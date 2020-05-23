import React from 'react';
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

const ProductDescriptionModal = (props:ModalPropTypes): JSX.Element => {
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
          <ProductControls inputId={props.inputId} 
          type={props.type} price={props.price} 
          quantity={props.selectedQuantity} handler={handler} />
        </div>
      </div>
    </>
  )
}

export default ProductDescriptionModal;