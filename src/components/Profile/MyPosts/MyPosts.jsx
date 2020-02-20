import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

function MyPosts () {

  let postsData = [
    {message: "Hi. how are you?"},
    {message: "It's my first post"},
  ]; 

  let posts = postsData.map(p => <Post message={p.message} />);

   return(
      <div>
          my posts
          <div>
            new post
          </div> 
          <div className={s.posts}>
            {posts}
          </div>
        </div>
   );
}

export default MyPosts;