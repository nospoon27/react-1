import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts (props) {
  let newPostElem = React.createRef();

  // Обработка события добавления нового поста
  let onAddPost = () => { 
    let action = { type: 'ADD-POST' };
    props.dispatch(action);
  }
  
  // Обработка события изменения текста в <textarea />
  let onPostChange = () => {
    let text = newPostElem.current.value;
    let action = { type: 'UPDATE-NEW-POST-TEXT', text: text };
    props.dispatch(action);
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