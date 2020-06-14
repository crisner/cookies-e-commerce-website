import { v4 as uuidv4 } from 'uuid';
import { CartState, ADD_TO_CART, ADD_CUSTOM_BOX_TO_CART, REMOVE_FROM_CART, 
  REMOVE_CUSTOM_BOX_FROM_CART, UPDATE_CART, CartActionTypes } from './types';

  const initialState: CartState = {
    itemsInCart: {
      boxes: [],
      customBoxes: {}
    }
  }

  export default (state = initialState, action: CartActionTypes): CartState => {
    switch(action.type) {
      case ADD_TO_CART: {
        const { item } = action.payload;
        return {
          ...state,
          itemsInCart: {
            ...state.itemsInCart,
            boxes: [...state.itemsInCart.boxes, item]
          }
        };
      }
      case ADD_CUSTOM_BOX_TO_CART: {
        const { item } = action.payload;
        const id = uuidv4();
        return {
          ...state,
          itemsInCart: {
            ...state.itemsInCart,
            customBoxes: {
              ...state.itemsInCart.customBoxes,
              [id]: item
            }
          }
        };
      }
      case REMOVE_FROM_CART: {
        const { id, quantity } = action.payload;
        return {
          ...state,
          itemsInCart: {
            ...state.itemsInCart,
            boxes: state.itemsInCart.boxes.filter(item => item.id !== id),
          }
        };
      }
      case REMOVE_CUSTOM_BOX_FROM_CART: {
        const { id } = action.payload;
        const currentCustomBoxes = state.itemsInCart.customBoxes;
        delete currentCustomBoxes[id];
        return {
          ...state,
          itemsInCart: {
            ...state.itemsInCart,
            customBoxes: currentCustomBoxes
          }
        };
      }
      case UPDATE_CART: {
        const { id, quantity } = action.payload;
        return {
          ...state,
          itemsInCart: {
            ...state.itemsInCart,
            boxes: state.itemsInCart.boxes.map(item => {
              if(item.id === id) {
                item.quantity = quantity;
                item.price = item.perUnitPrice * quantity;
              }
              return item;
            })
          }
        };
      }
      default:
        return state;
    }
  }