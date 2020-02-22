import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
import state from './redux/state';
import {addPost, updateNewPostText} from './redux/state';

export let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
    <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
  </BrowserRouter>, document.getElementById('root'));
};