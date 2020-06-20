import { createStore, combineReducers } from "redux";
import boxBuilderReducer from './boxBuilder/reducers';
import cartReducer from './cart/reducers';

const rootReducer = combineReducers({
  boxBuilder: boxBuilderReducer,
  cart: cartReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);