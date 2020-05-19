import React from 'react';

interface ProductListItemType {
  name: string,
  image: string,
  amount: number,
  quantity: number,
  description?: string
}

const ProductListItem = (props: ProductListItemType): JSX.Element => (
  <div className="product-list-item">
    <img className="product-image" src={props.image}
     alt="Image of Product name" />
    <div className="product-footer">
      <h3 className="product-title">{props.name}</h3>
      <div className="product-details">
        <p className="product-cost">Rs.{props.amount}</p>
        <div className="product-quantity">
        <select name="quantity" id="quantity">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select> 
        Pc</div>
        <button className="btn-add">Add</button>
      </div> 
    </div>
  </div>
)

export default ProductListItem;