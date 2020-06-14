import { CartItem, ADD_TO_CART, ADD_CUSTOM_BOX_TO_CART, REMOVE_FROM_CART, 
  REMOVE_CUSTOM_BOX_FROM_CART, UPDATE_CART, CartActionTypes } from './types';

export const addToCart = (item: CartItem): CartActionTypes => ({
  type: ADD_TO_CART,
  payload: {
    item
  }
});

export const addCustomBoxToCart = (item: CartItem[]): CartActionTypes => ({
  type: ADD_CUSTOM_BOX_TO_CART,
  payload: {
    item
  }
});

export const removeCartItem = (id: string, quantity: number) => ({
  type: REMOVE_FROM_CART,
  payload: {
    id,
    quantity
  }
});

export const removeCustomBox = (id: string) => ({
  type: REMOVE_CUSTOM_BOX_FROM_CART,
  payload: {
    id
  }
});

export const updateCart = (id: string, quantity: number) => ({
  type: UPDATE_CART,
  payload: {
    id,
    quantity
  }
});