import React, { useState, useRef } from 'react';
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

const ProductListItem = (props: ProductListItemType): JSX.Element => {
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
            <button className="btn-add">Add</button>
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

export default ProductListItem;