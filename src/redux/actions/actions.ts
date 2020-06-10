import { ADD_PIECE, REMOVE_PIECE, UPDATE_PIECE_QUANTITY } from './actionTypes';

/* ========= BOX BUILDER ========== */
export const addPiece = pieceDetails => ({
  type: ADD_PIECE,
  payload: {
    pieceDetails
  }
});

export const removePiece = id => ({
  type: REMOVE_PIECE,
  payload: {
    id
  }
});

export const updatePieceQuantity = (id, quantity) => ({
  type: UPDATE_PIECE_QUANTITY,
  payload: {
    id,
    quantity
  }
});