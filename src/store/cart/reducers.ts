import { CartState, ADD_TO_CART, REMOVE_FROM_CART, 
  UPDATE_CART, CartActionTypes } from './types';

  const initialState: CartState = {
    itemsInCart: []
  }

  export default (state = initialState, action: CartActionTypes): CartState => {
    switch(action.type) {
      case ADD_TO_CART: {
        const { item } = action.payload;
        return {
          ...state,
          itemsInCart: [...state.itemsInCart, item]
        };
      }
      case REMOVE_FROM_CART: {
        const { id, quantity } = action.payload;
        return {
          ...state,
          itemsInCart: state.itemsInCart.filter(item => item.id !== id)
        };
      }
      case UPDATE_CART: {
        const { id, quantity } = action.payload;
        return {
          ...state,
          itemsInCart: state.itemsInCart.map(item => {
            if(item.id === id) {
              item.quantity = quantity;
              item.price = item.perUnitPrice * quantity;
            }
            return item;
          })
        };
      }
      default:
        return state;
    }
  }