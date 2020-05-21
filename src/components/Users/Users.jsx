import React from "react";
import styles from "./Users.module.css";
import userPhoto from "./../../assets/images/userPhoto1.png";
import axios from "axios";
import { followAPI } from "../../api/followAPI";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/usersAPI";

let Users = (props) => {
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div className={styles.pagination}>
        {pages.map((page) => {
          return (
            <span
              className={props.currentPage === page ? styles.selectedPage : ""}
              onClick={(e) => {
                props.onPageChanged(page);
              }}>
              {page}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  width="80px"
                  alt={u.name}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.toggleFollowProgress(true, u.id);
                    usersAPI.unfollow(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                      props.toggleFollowProgress(false, u.id);
                    });
                  }}>
                  unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.follow(u.id);
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
      ))}
    </div>
  );
};

export default Users;
