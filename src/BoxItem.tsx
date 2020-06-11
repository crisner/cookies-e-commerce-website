import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from './store';
import { SelectedPiece } from './store/boxBuilder/types'
import { removePiece, updatePieceQuantity } from './store/boxBuilder/actions';
import { getSelectedPiece } from './store/boxBuilder/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state: AppState, ownProps: {selectedPiece: SelectedPiece}) => {
  const currentPiece = getSelectedPiece(state, ownProps.selectedPiece.id);
  return {currentPiece};
}

const mapDispatchToProps = dispatch => {
  return {
    removePiece: (id: string, quantity: number) => dispatch(removePiece(id, quantity)),
    updatePieceQuantity: (id: string, quantity: number) => dispatch(updatePieceQuantity(id, quantity))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  selectedPiece: SelectedPiece
  currentPiece: SelectedPiece
}

const BoxItem = ({selectedPiece, currentPiece, removePiece, updatePieceQuantity}:Props): JSX.Element => (
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
    <FontAwesomeIcon className="product-remove" icon={faTrashAlt} onClick={() => removePiece(selectedPiece.id, selectedPiece.quantity)} />
  </div>  
)

export default connector(BoxItem);