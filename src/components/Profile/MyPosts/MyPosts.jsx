import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts (props) {
  let newPostElem = React.createRef();

  // Обработка события добавления нового поста
  let onAddPost = () => { 
    let text = newPostElem.current.value;
    props.addPost();
  }
  
  // Обработка события изменения текста в <textarea />
  let onPostChange = () => {
    let text = newPostElem.current.value;
    props.updateNewPostText(text);
    console.log(text);
  }

  let posts = props.posts.map(p => <Post message={p.message} />);

   return(
      <div>
          my posts
          <div>
            <div>
              <textarea ref={newPostElem} 
              value={props.newPostText}
              onChange={onPostChange} />
              <button onClick={onAddPost}>Add</button>
            </div>
          </div> 
          <div className={s.posts}>
            {posts}
          </div>
        </div>
   );
}

export default MyPosts;