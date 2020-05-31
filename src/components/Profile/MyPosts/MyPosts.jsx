import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostCreator, updateNewPostCreator}  from './../../../redux/profileReducer';
import { Field, reduxForm } from 'redux-form';

const MyPosts = (props) => {
let posts = props.posts.map(p => <Post message={p.message} />);

  let addNewPost = (values) => {
    let {newPost} = values;
    props.addPost(newPost);
  };

   return(
      <div>
          my posts
          <div>
            <AddPostReduxForm onSubmit={addNewPost} />
          </div> 
          <div className={s.posts}>
            {posts}
          </div>
        </div>
   );
}

let AddPostReduxForm = (props) => {
  let {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit}>
    <Field component={'textarea'} name={'newPost'} placeholder={'Text...'} />
      <button>Add</button>
    </form>
  );
}

AddPostReduxForm = reduxForm({
  form: 'addPost'
})(AddPostReduxForm);

export default MyPosts;