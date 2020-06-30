import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import boxBuilderReducer from './boxBuilder/reducers';
import cartReducer from './cart/reducers';
import authReducer from './auth/reducers';

const rootReducer = combineReducers({
  boxBuilder: boxBuilderReducer,
  cart: cartReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, {}, applyMiddleware(reduxThunk));