import React from "react";
import styles from "./Users.module.css";
import userPhoto from "./../../assets/images/userPhoto1.png";
import axios from "axios";

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
              className={props.currentPage === page && styles.selectedPage}
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
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                width="80px"
                className={styles.userPhoto}
              />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "6d6a5255-b379-4b78-9ee2-ec32179f3020"
                          }
                        }
                      )
                      .then((responce) => {
                        if (responce.data.resultCode === 0) {
                          props.unfollow(u.id);                         
                        }
                      });
                  }}>
                  unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "6d6a5255-b379-4b78-9ee2-ec32179f3020"
                          }
                        }
                      )
                      .then((responce) => {
                        if (responce.data.resultCode === 0) {
                          props.follow(u.id);                         
                        }
                      });
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
