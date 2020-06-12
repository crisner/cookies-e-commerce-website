import { AppState } from '../';

export const getCartItems = (store: AppState) => store.cart.itemsInCart;