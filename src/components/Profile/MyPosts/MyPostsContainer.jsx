import React from "react";
import {
  addPostCreator,
  updateNewPostCreator
} from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateNewPostText: () => {
      dispatch(addPostCreator());
    },
    addPost: text => {
      dispatch(updateNewPostCreator(text));
    }
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
