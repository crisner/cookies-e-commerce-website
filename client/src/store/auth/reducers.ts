import { 
  AuthState, CURRENT_USER, 
  AUTHENTICATED, UNAUTHENTICATED, 
  AUTHENTICATION_ERROR, 
  REGISTER, REGISTER_ERROR, AuthActionTypes} from './types';

const initialState: AuthState = {
  isAuthenticated: null,
  loading: false,
  user: {},
  error: {}
};

export default function(state: AuthState=initialState, action: AuthActionTypes) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, error: {}, isAuthenticated: true };
    case UNAUTHENTICATED:
      return { ...state, error: {}, isAuthenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload, isAuthenticated: false };
    case REGISTER:
      return { ...state, error: {}, user: action.payload};
    case REGISTER_ERROR:
      return { ...state, error: action.payload };
    // case CURRENT_USER:
    //   return { ...state, user: action.payload };
    default:
      return state;
  }
}