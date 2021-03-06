import { SelectedPiece, ADD_PIECE, REMOVE_PIECE, UPDATE_PIECE_QUANTITY, RESET_BOX_BUILDER, BoxBuilderActionTypes } from './types';

export const addPiece = (pieceDetails: SelectedPiece): BoxBuilderActionTypes => ({
  type: ADD_PIECE,
  payload: {
    pieceDetails
  }
});

export const removePiece = (id: string, quantity: number): BoxBuilderActionTypes => ({
  type: REMOVE_PIECE,
  payload: {
    id,
    quantity
  }
});

export const updatePieceQuantity = (id: string, quantity: number): BoxBuilderActionTypes => ({
  type: UPDATE_PIECE_QUANTITY,
  payload: {
    id,
    quantity
  }
});

export const resetBoxBuilder = (): BoxBuilderActionTypes => ({
  type: RESET_BOX_BUILDER
});