import { AppState } from '../';

export const getSelectedPieces = (store: AppState) => store.boxBuilder.selectedPieces;

export const getSelectedPiece = (store: AppState, id: string) => store.boxBuilder.selectedPieces.filter(piece => piece.id === id);

export const getTotalItemsInBox = (store: AppState) => store.boxBuilder.piecesInBox;