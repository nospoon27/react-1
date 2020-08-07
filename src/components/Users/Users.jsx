import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({users, currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map((u) => (
        <User
          key={u.id}
          user={u}
          follow={props.follow}
          unfollow={props.unfollow}
          followingInProgress={props.followingInProgress}
        />
      ))}
    </div>
  );
};

export default Users;