import { createStore, combineReducers } from "redux";
import boxBuilderReducer from './boxBuilder/reducers';

const rootReducer = combineReducers({boxBuilder: boxBuilderReducer});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);