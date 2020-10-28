import {createStore, combineReducers, applyMiddleware, compose, Action} from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from "./usersReducer";
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from "./appReducer";

let rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   sidebar: sidebarReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
   composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;