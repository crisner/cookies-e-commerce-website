import React from 'react';
import { connect } from 'react-redux';
import { removePiece, updatePieceQuantity } from './redux/actions';
import { getSelectedPiece } from './redux/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const BoxItem = ({selectedPiece, currentPiece, removePiece, updatePieceQuantity}): JSX.Element => (
  <div className="box-item">
    <div className="edit-controls">
      <FontAwesomeIcon icon={faPlusSquare} onClick={() => updatePieceQuantity(selectedPiece.id, selectedPiece.quantity + 1)} />
      <FontAwesomeIcon icon={faMinusSquare} onClick={() => updatePieceQuantity(selectedPiece.id, selectedPiece.quantity - 1)} />
    </div>
    <p className="selected-quantity">{currentPiece[0].quantity}</p>
    <div className="preview-img" style={{contain: 'content'}}>
      <img src={selectedPiece.image} alt={`Image of ${selectedPiece.name} cookies`} style={{width: '100%'}} />
    </div>
    <p className="product-name">{selectedPiece.name}</p>
    <p className="product-cost">Rs. {selectedPiece.price.toFixed(2)}</p>
    <FontAwesomeIcon className="product-remove" icon={faTrashAlt} onClick={() => removePiece(selectedPiece.id)} />
  </div>  
)

const mapStateToProps = (state, ownProps) => {
  const currentPiece = getSelectedPiece(state, ownProps.selectedPiece.id);
  return {currentPiece};
}

const mapDispatchToProps = dispatch => {
  return {
    removePiece: id => dispatch(removePiece(id)),
    updatePieceQuantity: (id, quantity) => dispatch(updatePieceQuantity(id, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxItem);