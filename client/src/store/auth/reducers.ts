import { 
  AuthState, 
  AUTHENTICATED, UNAUTHENTICATED, 
  AUTHENTICATION_ERROR } from './types';

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  user: {
    email: '',
    password: ''
  },
  error: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, loggedIn: true };
    case UNAUTHENTICATED:
      return { ...state, loggedIn: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}