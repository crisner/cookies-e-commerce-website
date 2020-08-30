import axios from 'axios';
import {
  AUTHENTICATED, 
  UNAUTHENTICATED, 
  AUTHENTICATION_ERROR,
  REGISTER,
  REGISTER_ERROR, 
  FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/user');
    dispatch({type: FETCH_USER, payload: res.data});
  } catch(err) {
    console.log('Error fetching user')
  }
}

export const registerUser = (userInfo, history) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', userInfo);
    history.push('/auth/login');
    dispatch({ type: REGISTER, payload: userInfo });
  } catch(error) {
    if (error.response) {
      dispatch({
        type: REGISTER_ERROR,
        payload: { message: error.response.data.error.message }
      });
    }  else {
      dispatch({
        type: REGISTER_ERROR,
        payload: { message: 'Something went wrong' }
      });
    }
  }
}

export const signIn = ({ email, password }, history) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', { email, password });
    history.push('/');
    dispatch({ type: AUTHENTICATED });
  } catch(error) {
    if (error.response) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: { message: error.response.data.error.message }
      });
    }  else {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: { message: 'Something went wrong' }
      });
    } 
  }
}

export const logOut = () => async dispatch => {
  try {
    console.log('logout')
    const res = await axios.post('/auth/logout');
    dispatch({ type: UNAUTHENTICATED });
  } catch(error) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: { message: 'Something went wrong' }
    });
  }
}