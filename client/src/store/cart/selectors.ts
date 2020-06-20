import { AppState } from '../';

export const getCartItems = (store: AppState) => store.cart.itemsInCart;

// export const getCartItem = (store: AppState, id: string) => store.cart.itemsInCart.filter(piece => piece.id === id);

export const getBoxesInCart = (store: AppState) => store.cart.itemsInCart.boxes;

export const getCustomBoxesInCart = (store: AppState) => store.cart.itemsInCart.customBoxes;

export const getBoxInCart = (store: AppState, id: string) => store.cart.itemsInCart.boxes.filter(piece => piece.id === id);