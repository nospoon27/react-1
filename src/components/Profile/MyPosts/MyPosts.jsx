import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLenght } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormsControl';

const maxLenght30 = maxLenght(30);

const MyPosts = (props) => {
let posts = props.posts.map(p => <Post message={p.message} />);

  let addNewPost = (values) => {
    let {newPost} = values;
    props.addPost(newPost);
  };

  let AddPostReduxForm = (props) => {
    let {handleSubmit} = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          component={Textarea}
          name={"newPost"}
          placeholder={"Text..."}
          validate={[required, maxLenght30]}
        />
        <button>Add</button>
      </form>
    );
  }
  
  AddPostReduxForm = reduxForm({
    form: 'addPost'
  })(AddPostReduxForm);

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



export default MyPosts;