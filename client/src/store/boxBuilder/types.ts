export interface SelectedPiece {
  id: string
  name: string
  image: string
  price: number
  perUnitPrice: number
  quantity: number
  type: string
}

export interface BoxBuilderState {
  selectedPieces: SelectedPiece[],
  piecesInBox: number
}

export const ADD_PIECE = 'ADD_PIECE';
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const UPDATE_PIECE_QUANTITY = 'UPDATE_PIECE_QUANTITY';
export const RESET_BOX_BUILDER = 'RESET_BOX_BUILDER';

interface AddPieceAction {
  type: typeof ADD_PIECE
  payload: {
    pieceDetails: SelectedPiece
  }
}

interface RemovePieceAction {
  type: typeof REMOVE_PIECE
  payload: {
    id: string
    quantity: number
  }
}

interface UpdatePieceQuantity {
  type: typeof UPDATE_PIECE_QUANTITY
  payload: {
    id: string
    quantity: number
  }
}

interface ResetBoxBuilderAction {
  type: typeof RESET_BOX_BUILDER
}

export type BoxBuilderActionTypes = AddPieceAction | RemovePieceAction | UpdatePieceQuantity | ResetBoxBuilderAction