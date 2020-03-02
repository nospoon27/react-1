import React from "react";
import styles from "./Users.module.css";

function Users(props) {
   if(props.users.length === 0){
      props.setUsers([{
      id: 1,
      fullName: 'Dim Zinnatov',
      photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
      followed: false,
      status: 'Sleep',
      location: {
         city: 'Ufa',
         country: 'Russia'
      }
   },
   {
      id: 2,
      fullName: 'Dim Zinnatov',
      photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
      followed: true,
      status: 'Sleep',
      location: {
         city: 'Spb',
         country: 'Russia'
      }
   },
   {
      id: 3,
      fullName: 'Dim Zinnatov',
      photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
      followed: false,
      status: 'Sleep',
      location: {
         city: 'Salavat',
         country: 'Russia'
      }
   },
   {
      id: 4,
      fullName: 'Dim Zinnatov',
      photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
      followed: false,
      status: 'Sleep',
      location: {
         city: 'Moscow',
         country: 'Russia'
      }
   },
   ]);
   }

  let users = props.users.map((u) => (
    <div key={u.id}>
      <span>
        <div>
          <img src={u.photoUrl} width="80px" className={styles.userPhoto} />
        </div>
        <div>
          {u.followed ? (
            <button onClick={() => { props.unfollow(u.id) }}>unfollow</button>
          ) : (
            <button onClick={() => { props.follow(u.id) }}>follow</button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{u.fullName}</div>
          <div>{u.status}</div>
        </span>
        <span>
          <div>{u.location.country}</div>
          <div>{u.location.city}</div>
        </span>
      </span>
    </div>
  ));

  return <div>{users}</div>;
}

export default Users;
