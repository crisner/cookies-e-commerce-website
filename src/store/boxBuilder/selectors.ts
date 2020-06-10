export const getSelectedPieces = store => store.boxBuilder.selectedPieces;

export const getSelectedPiece = (store, id) => store.boxBuilder.selectedPieces.filter(piece => piece.id === id);