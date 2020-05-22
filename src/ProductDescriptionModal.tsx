import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalPropTypes {
  id: string,
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
          <div className="product-details">
            <p className="product-cost">Rs.{props.price * props.selectedQuantity}</p>
            <div className="product-quantity">
              <input type="number" name="modal-quantity" 
              id="modal-quantity" min="1" max="18" 
              defaultValue={props.selectedQuantity} 
              onChange={(e) => {
                if(typeof handler === 'function') {
                  handler(Number(e.target.value))
                } else {
                  throw new Error('Expected handler prop to be a function.');
                }
              }} />
              {props.type}
              {props.type === 'pc' && props.selectedQuantity > 1 ? 's' : (
                props.type === 'box' && props.selectedQuantity > 1 ? 'es' : ''
                )}
            </div>
            <button className="btn-add">Add</button>
          </div> 
        </div>
      </div>
    </>
  )
}

export default ProductDescriptionModal;