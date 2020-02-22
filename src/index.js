import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
import state, { subscribe } from './redux/state';
import {addPost, updateNewPostText} from './redux/state';

let renderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
    <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
  </BrowserRouter>, document.getElementById('root'));
}

renderEntireTree();

subscribe(renderEntireTree);

// serviceWorker.unregister();