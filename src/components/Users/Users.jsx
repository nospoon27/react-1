import React from "react";
import styles from "./Users.module.css";
import * as axios from "axios";
import userPhoto from './../../assets/images/MgEvADJCEofpRQZNvSIF.png';
import userPhoto1 from './../../assets/images/userPhoto1.png';

class Users extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((responce) => {
        this.props.setUsers(responce.data.items);
      });
  }

  render() {
    let users = this.props.users.map((u) => (
      <div key={u.id}>
        <span>
          <div>
            <img
              src={u.photos.small != null ? u.photos.small : userPhoto1}
              width="80px"
              className={styles.userPhoto}
            />
          </div>
          <div>
            {u.followed ? (
              <button
                onClick={() => {
                  this.props.unfollow(u.id);
                }}>
                unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.follow(u.id);
                }}>
                follow
              </button>
            )}
          </div>
        </span>
        <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{"u.location.country"}</div>
            <div>{"u.location.city"}</div>
          </span>
        </span>
      </div>
    ));

    return (
      <div>
        {users}
      </div>
    );
  }
}

export default Users;
