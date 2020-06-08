import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BoxItem = ({selectedPiece}): JSX.Element => (
  <div className="box-item">
    <p className="selected-quantity">{selectedPiece.quantity} x</p>
    <div className="preview-img" style={{contain: 'content'}}>
      <img src={selectedPiece.image} alt={`Image of ${selectedPiece.name} cookies`} style={{width: '4rem'}} />
    </div>
    <p className="product-name">{selectedPiece.name}</p>
    <p className="product-cost">Rs. {selectedPiece.price}</p>
    <FontAwesomeIcon className="product-remove" icon={faTrashAlt} />
    {/* <button className="btn-add product-remove">X</button> */}
  </div>
)

export default connect()(BoxItem);