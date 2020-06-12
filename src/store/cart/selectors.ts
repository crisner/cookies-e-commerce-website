import { AppState } from '../';

export const getCartItems = (store: AppState) => store.cart.itemsInCart;

export const getCartItem = (store: AppState, id: string) => store.cart.itemsInCart.filter(piece => piece.id === id);