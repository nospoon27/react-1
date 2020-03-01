import React from 'react';
import {addPostCreator, updateNewPostCreator}  from './../../../redux/profileReducer';
import MyPosts from './MyPosts';

// *
function MyPostsContainer (props) {
  let state = props.store.getState();

  // Обработка события добавления нового поста
  let addPost = () => { 
    props.store.dispatch(addPostCreator());
  }
  
  // Обработка события изменения текста в <textarea />
  let postChange = (text) => {
    props.store.dispatch(updateNewPostCreator(text));
  }

  // let posts = props.store.prodilePage.posts.map(p => <Post message={p.message} />);

   return <MyPosts updateNewPostText={postChange} 
                   addPost={addPost} 
                   posts={state.profilePage.posts}
                   newPostText={state.profilePage.newPostText} />;
}

export default MyPostsContainer;