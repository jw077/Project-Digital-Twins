import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { applyMiddleware, compose } from 'redux';

const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware()),
);

export default store;