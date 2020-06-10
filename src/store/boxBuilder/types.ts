export interface SelectedPiece {
  id: string
  name: string
  image: string
  price: number
  perUnitPrice: number
  quantity: number
}

export interface BoxBuilderState {
  selectedPieces: SelectedPiece[]
}

export const ADD_PIECE = 'ADD_PIECE';
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const UPDATE_PIECE_QUANTITY = 'UPDATE_PIECE_QUANTITY';

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
  }
}

interface UpdatePieceQuantity {
  type: typeof UPDATE_PIECE_QUANTITY
  payload: {
    id: string
    quantity: number
  }
}

export type BoxBuilderActionTypes = AddPieceAction | RemovePieceAction | UpdatePieceQuantity