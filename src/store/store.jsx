import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import thunk from 'redux-thunk'
import { uiReducer } from "../reducers/uiReducer";
import { noteReducer } from "../reducers/noteReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    note: noteReducer
});

export const store = createStore( reducers, composeEnhancers( applyMiddleware( thunk ) ) );