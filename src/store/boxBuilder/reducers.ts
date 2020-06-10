import { BoxBuilderState, ADD_PIECE, REMOVE_PIECE, UPDATE_PIECE_QUANTITY, BoxBuilderActionTypes } from './types';

const initialState: BoxBuilderState = {
  selectedPieces: []
};

export default function(state = initialState, action: BoxBuilderActionTypes): BoxBuilderState {
  switch(action.type) {
    case ADD_PIECE: {
      const { pieceDetails } = action.payload;
      return {
        ...state,
        selectedPieces: [
          ...state.selectedPieces,
          pieceDetails
        ]
      };
    }
    case REMOVE_PIECE: {
      const { id } = action.payload;
      return {
        ...state,
        selectedPieces: state.selectedPieces.filter(piece => piece.id !== id)
      };
    }
    case UPDATE_PIECE_QUANTITY: {
      const { id, quantity } = action.payload;
      return {
        ...state,
        selectedPieces: state.selectedPieces.map(piece => {
          if(piece.id === id) {
            piece.quantity = quantity;
            piece.price = piece.perUnitPrice * quantity;
          }
          return piece;
        })
      };
    }
    default:
      return state;
  }
}