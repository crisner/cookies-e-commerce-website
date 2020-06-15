import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { BoxBuilderState } from '../store/boxBuilder/types';
import { getSelectedPieces, getTotalItemsInBox } from '../store/boxBuilder/selectors';
import { resetBoxBuilder } from '../store/boxBuilder/actions';
import { addCustomBoxToCart } from '../store/cart/actions';
import { CartItem } from '../store/cart/types';
import BoxItem from './BoxItem';

interface Props extends BoxBuilderState {
  addCustomBoxToCart: (item: CartItem[], total: number) => any
  resetBoxBuilder: () => any
}

const BuildABox = ({selectedPieces, piecesInBox, addCustomBoxToCart, resetBoxBuilder}: Props): JSX.Element => {
  const [boxSize, setBoxSize] = useState(10);
  const piecesToAdd = boxSize - piecesInBox;
  let total = 0;
  return (
    <div className="build-a-box-ui">
      <h3>Custom Box Builder</h3>
      <p style={{display: 'inline-block', marginRight: '1rem'}}>Choose your box size</p>
      <select name="box-size" id="box-size" value={boxSize} onChange={(e) => setBoxSize(Number(e.target.value))}>
        <option value="10">10 pieces</option>
        <option value="16">16 pieces</option>
        <option value="25">25 pieces</option>
      </select>
      <h4>Start adding pieces from the left. You can add upto {piecesToAdd < 0 ? 0 : piecesToAdd} pieces.</h4>
      {selectedPieces && selectedPieces.length
      ? selectedPieces.map((item, index) => {
          total = total + item.price;
          return <BoxItem key={item.id + index} selectedItem={item} />;
        })
      : null}
      <div className="total">
        <p>Total</p>
        <p>Rs.{total.toFixed(2)}</p>
      </div>
      {piecesInBox === boxSize ? 
        <button className="btn-add" onClick={() => {
          addCustomBoxToCart(selectedPieces, total)
          resetBoxBuilder()
        }}>Add box to cart</button> : 
        <button disabled className="btn-add disabled">Add box to cart</button>
      }
      {piecesToAdd < 0 ? <p style={{
        textAlign: 'center',
        fontSize: '0.9rem'
        }}>Remove {Math.abs(piecesToAdd)} 
        {Math.abs(piecesToAdd) === 1 ? ' piece' : ' pieces'}
        { boxSize < 25 ? ' or choose a different box size' : null}
      </p> : null}
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  const selectedPieces = getSelectedPieces(state);
  const piecesInBox = getTotalItemsInBox(state);
  return {selectedPieces, piecesInBox};
}

const mapDispatchToProps = dispatch => {
  return {
    addCustomBoxToCart: (item: CartItem[], total: number) => dispatch(addCustomBoxToCart(item, total)),
    resetBoxBuilder: () => dispatch(resetBoxBuilder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildABox);