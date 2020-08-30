import { 
  AuthState, CURRENT_USER, 
  AUTHENTICATED, UNAUTHENTICATED, 
  AUTHENTICATION_ERROR, 
  REGISTER, REGISTER_ERROR} from './types';

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  user: {},
  error: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, error: {}, loggedIn: true };
    case UNAUTHENTICATED:
      return { ...state, error: {}, loggedIn: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case REGISTER:
      return { ...state, error: {}, user: action.payload};
    case REGISTER_ERROR:
      return { ...state, error: action.payload };
    case CURRENT_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}