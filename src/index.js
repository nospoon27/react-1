import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
import store from './redux/reduxStore';

let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
    <App state={state} dispatch={store.dispatch.bind(store)} />
  </BrowserRouter>, document.getElementById('root'));
}

renderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  renderEntireTree(state);
});

// serviceWorker.unregister();