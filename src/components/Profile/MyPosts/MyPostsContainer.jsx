import React from "react";
import {
  addPostCreator,
  updateNewPostCreator
} from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

function MyPostsContainer(props) {
  return (
    <StoreContext.Consumer>{
      store => {
        let state = store.getState();

        // Обработка события добавления нового поста
        let addPost = () => {
          store.dispatch(addPostCreator());
        };

        // Обработка события изменения текста в <textarea />
        let postChange = text => {
          store.dispatch(updateNewPostCreator(text));
        };
        return (
          <MyPosts
            updateNewPostText={postChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
          />
        );
      }
    }
    </StoreContext.Consumer>
  );
}

export default MyPostsContainer;
