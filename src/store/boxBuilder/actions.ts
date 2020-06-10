import { SelectedPiece, ADD_PIECE, REMOVE_PIECE, UPDATE_PIECE_QUANTITY, BoxBuilderActionTypes } from './types';

export const addPiece = (pieceDetails: SelectedPiece): BoxBuilderActionTypes => ({
  type: ADD_PIECE,
  payload: {
    pieceDetails
  }
});

export const removePiece = (id: string): BoxBuilderActionTypes => ({
  type: REMOVE_PIECE,
  payload: {
    id
  }
});

export const updatePieceQuantity = (id: string, quantity: number): BoxBuilderActionTypes => ({
  type: UPDATE_PIECE_QUANTITY,
  payload: {
    id,
    quantity
  }
});