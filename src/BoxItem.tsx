import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BoxItem = (): JSX.Element => (
  <div className="box-item">
    <p className="selected-quantity">1 x</p>
    <div className="preview-img"></div>
    <p className="product-name">Product name</p>
    <p className="product-cost">Rs. 45.00</p>
    <FontAwesomeIcon className="product-remove" icon={faTrashAlt} />
    {/* <button className="btn-add product-remove">X</button> */}
  </div>
)

export default BoxItem;