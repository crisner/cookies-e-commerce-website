import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addPiece } from './store/boxBuilder/actions';
import { SelectedPiece } from './store/boxBuilder/types';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import ProductDescriptionModal from './ProductDescriptionModal';
import ProductControls from './ProductControls';

interface ProductListItemType {
  id: string,
  name: string,
  image: string,
  price: number,
  type: string,
  description?: string
}

interface Props extends ProductListItemType {
  addPiece: (pieceDetails: SelectedPiece) => any
}

const ProductListItem = (props: Props): JSX.Element => {
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const productImg = useRef(null);
  const [width, setWidth] = useState(0);
  const dataHandler = (quantity: number) => setQuantity(quantity);
  const closeModal = () => setModal(false);

  return (
    <>
      <div className="product-list-item" ref={productImg} 
      onLoad={() => setWidth(productImg.current.clientWidth)} >
        <div className="product-image-container" 
        onClick={() => setModal(true)}
        style={{width:`${width}px`, height: `${width}px`}}>
          <div className="view-product-info" 
          style={{width:`${width}px`, height: `${width}px`}}>
            <FontAwesomeIcon className="view-icon" icon={faEye} />
          </div>
          <img className="product-image" src={props.image}
          alt="Image of Product name" />
        </div>
        
        <div className="product-footer">
          <h3 className="product-title">{props.name}</h3>
          <div className="product-details">
            <ProductControls inputId="product-quantity" 
            type={props.type} price={props.price} quantity={quantity} handler={dataHandler} />
            <button className="btn-add" onClick={() => {
                props.addPiece({
                  id: uuidv4(),
                  name: props.name,
                  image: props.image,
                  price: props.price * quantity,
                  perUnitPrice: props.price,
                  quantity: quantity,
                })
            }}>Add</button>
          </div> 
        </div>
      </div>
      {modal ? (
        <ProductDescriptionModal 
        id={props.id}
        inputId="modal-quantity"
        name={props.name} 
        image={props.image} 
        price={props.price} 
        type={props.type}
        description={props.description}
        selectedQuantity={quantity}
        closeModal={closeModal}
        handler={dataHandler} />
      ) : null}
  </>
)}

const mapDispatchToProps = dispatch => {
  return {
    addPiece: (pieceDetails: SelectedPiece) => dispatch(addPiece(pieceDetails))
  }
}

export default connect(null, mapDispatchToProps)(ProductListItem);
