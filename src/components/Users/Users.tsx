import React, { FC } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from '../../types/types';

type PropsType = {
   users: Array<UserType>
   currentPage: number
   totalUsersCount: number
   pageSize: number
   onPageChanged: (pageNumber: number) => void
   unfollow: (userId: number) => void
   follow: (userId: number) => void
   toggleFollowProgress: (isFetching: boolean, userId: number) => void
   followingInProgress: Array<number>
};

const Users: FC<PropsType> = ({ users, currentPage, totalUsersCount, pageSize, onPageChanged, ...props }) => {
   return (
      <div>
         <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} portionSize={1} />
         {users.map((u) => (
            <User key={u.id} user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />
         ))}
      </div>
   );
};

export default Users;
