import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts (props) {

  let addPost = () => { 
    let text = newPostElem.current.value;
    props.addPost(text);
    newPostElem.current.value = '';
  }
  let newPostElem = React.createRef();
  
  let posts = props.posts.map(p => <Post message={p.message} />);

   return(
      <div>
          my posts
          <div>
            <div>
              <textarea ref={newPostElem}></textarea>
              <button onClick={addPost}>Add</button>
            </div>
          </div> 
          <div className={s.posts}>
            {posts}
          </div>
        </div>
   );
}

export default MyPosts;