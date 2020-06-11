import { BoxBuilderState, ADD_PIECE, REMOVE_PIECE, UPDATE_PIECE_QUANTITY, BoxBuilderActionTypes } from './types';

const initialState: BoxBuilderState = {
  selectedPieces: [],
  piecesInBox: 0
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
        ],
        piecesInBox: state.piecesInBox + pieceDetails.quantity
      };
    }
    case REMOVE_PIECE: {
      const { id, quantity } = action.payload;
      return {
        ...state,
        selectedPieces: state.selectedPieces.filter(piece => piece.id !== id),
        piecesInBox: state.piecesInBox - quantity
      };
    }
    case UPDATE_PIECE_QUANTITY: {
      const { id, quantity } = action.payload;
      let updatedPiecesInBox = 0;
      return {
        ...state,
        selectedPieces: state.selectedPieces.map(piece => {
          if(piece.id === id) {
            piece.quantity = quantity;
            piece.price = piece.perUnitPrice * quantity;
          }
          updatedPiecesInBox = updatedPiecesInBox + piece.quantity;
          return piece;
        }),
        piecesInBox: updatedPiecesInBox
      };
    }
    default:
      return state;
  }
}