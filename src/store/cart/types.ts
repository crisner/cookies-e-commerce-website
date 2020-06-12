export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  perUnitPrice: number
  quantity: number
  type: string
}

export interface CartState {
  itemsInCart: CartItem[]
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART
  payload: {
    item: CartItem
  }
}

interface RemoveCartItemAction {
  type: typeof REMOVE_FROM_CART
  payload: {
    id: string
    quantity: number
  }
}

interface UpdateCartAction {
  type: typeof UPDATE_CART
  payload: {
    id: string
    quantity: number
  }
}

export type CartActionTypes = AddToCartAction | RemoveCartItemAction | UpdateCartAction;