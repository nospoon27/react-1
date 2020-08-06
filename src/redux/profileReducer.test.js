import profileReducer, { addPostCreator, deletePost } from './profileReducer';
import React from 'react';

let state = {
   posts: [{
      id: 1,
      message: "Hi. how are you?",
      likesCount: 1
    },
    {
      id: 2,
      message: "It's my first post",
      likesCount: 3
    },
  ],
  newPostText: '',
};

let postText = 'new post text';

it('posts length should be incremented after new post adding', () => {
   // 1. test date
   let action = addPostCreator(postText);
   
   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
   // 1. test date
   let action = addPostCreator('new post text');
   
   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts[2].message).toBe(postText);
});

it('post length after deleting should be increment', () => {
   let action = deletePost(1);
   let newState = profileReducer(state, action);

   expect(newState.posts.length).toBe(1);
});