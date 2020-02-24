import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
import store from './redux/state';

let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
    <App state={state} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} />
  </BrowserRouter>, document.getElementById('root'));
}

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);

// serviceWorker.unregister();