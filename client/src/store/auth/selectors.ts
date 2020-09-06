import { AppState } from '../';

export const isLogged = (store: AppState) => store.auth.isAuthenticated;

export const isLoading = (store: AppState) => store.auth.loading;

export const getUserDetails = (store: AppState) => store.auth.user;

export const getErrorMessage = (store: AppState) => store.auth.error.message;