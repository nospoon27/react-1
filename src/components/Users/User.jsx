import React from "react";
import styles from "./Users.module.css";
import userPhoto from "./../../assets/images/userPhoto1.png";
import { NavLink } from "react-router-dom";

const User = ({user, followingInProgress, follow, unfollow}) => {
  return (
    <div key={user.id}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img
                  src={user.photos.small != null ? user.photos.small : userPhoto}
                  width="80px"
                  alt={user.name}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  disabled={followingInProgress.some((id) => id === user.id)}
                  onClick={() => {
                    unfollow(user.id);
                  }}>
                  unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgress.some((id) => id === user.id)}
                  onClick={() => {
                    follow(user.id);
                  }}>
                  follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{"user.location.country"}</div>
              <div>{"user.location.city"}</div>
            </span>
          </span>
        </div>
  );
};

export default User;