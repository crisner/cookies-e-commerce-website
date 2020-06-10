import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from './store';
import { BoxBuilderState } from './store/boxBuilder/types';
import { getSelectedPieces } from './store/boxBuilder/selectors';
import BoxItem from './BoxItem';

type Props = BoxBuilderState;

const BuildABox = ({selectedPieces}: Props): JSX.Element => {
  const [boxSize, setBoxSize] = useState(10);
  
  return (
    <div className="build-a-box-ui">
      <h3>Custom Box Builder</h3>
      <p style={{display: 'inline-block', marginRight: '1rem'}}>Choose your box size</p>
      <select name="box-size" id="box-size" value={boxSize} onChange={(e) => setBoxSize(Number(e.target.value))}>
        <option value="10">10 pieces</option>
        <option value="16">16 pieces</option>
        <option value="25">25 pieces</option>
      </select>
      <h4>Start adding pieces from the left. You can add upto {boxSize} pieces.</h4>
      {selectedPieces && selectedPieces.length
      ? selectedPieces.map((item, index) => {
          return <BoxItem key={item.id + index} selectedPiece={item} />;
        })
      : null}
      <div className="total">
        <p>Total</p>
        <p>Rs.{selectedPieces && selectedPieces.length
      ? selectedPieces.reduce((total, item) => total + item.price, 0).toFixed(2)
      : '0.00'}</p>
      </div>
      <button className="btn-add">Add box to cart</button>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  const selectedPieces = getSelectedPieces(state);
  return {selectedPieces};
}

export default connect(mapStateToProps)(BuildABox);