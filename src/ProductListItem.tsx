import React, { useState } from 'react';
import ProductDescriptionModal from './ProductDescriptionModal';

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
  const dataHandler = (quantity: number) => setQuantity(quantity);
  const closeModal = () => setModal(false);

  return (
    <>
      <div className="product-list-item">
        <img className="product-image" src={props.image}
        alt="Image of Product name" onClick={() => setModal(true)} />
        <div className="product-footer">
          <h3 className="product-title">{props.name}</h3>
          <div className="product-details">
            <p className="product-cost">Rs.{props.price * quantity}</p>
            <div className="product-quantity">
            <input type="number" name="modal-quantity" 
              id="modal-quantity" min="1" max="18" 
              defaultValue="1" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))} />
            {props.type}
            {props.type === 'pc' && quantity > 1 ? 's' : (
              props.type === 'box' && quantity > 1 ? 'es' : ''
              )}</div>
            <button className="btn-add">Add</button>
          </div> 
        </div>
      </div>
      {modal ? (
        <ProductDescriptionModal 
        id={props.id}
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