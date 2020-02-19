import React from 'react'

function Profile () {
   return (
      <div className="content">
        <div className="content__avatar">
          <img className="content__avatar-image" src="https://avatars.mds.yandex.net/get-pdb/1016500/8c57d162-f659-452c-8624-1ab30677b48a/s1200"/>
        </div>
        <div>
          ava + desc
        </div>
        <div>
          my posts
          <div>
            new post
          </div>
          <div>
            posts
            <div>
              post1
            </div>
            <div>
              post2
            </div>
          </div>
        </div>
      </div>
   );
}

export default Profile;