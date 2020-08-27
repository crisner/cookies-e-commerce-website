export interface AuthState {
  loggedIn: boolean
  loading: boolean
  user: object
  error: object
}

interface SignInAction {
  type: typeof AUTHENTICATED | typeof AUTHENTICATION_ERROR,
  payload: undefined | { message: string }
}

interface LogOutAction {
  type: typeof UNAUTHENTICATED | typeof AUTHENTICATION_ERROR,
  payload: undefined | { message: string }
}

export const AUTHENTICATED = 'AUTHENTICATED_USER';
export const UNAUTHENTICATED = 'UNAUTHENTICATED_USER';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const REGISTER = 'REGISTER_USER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const FETCH_USER = 'FETCH_USER';
export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const CURRENT_USER = "CURRENT_USER";

export type AuthActionTypes = SignInAction | LogOutAction;