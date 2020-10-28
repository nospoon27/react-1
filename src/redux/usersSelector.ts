import { AppStateType } from './reduxStore';
import { createSelector } from 'reselect';
import { UserType } from '../types/types';

export const getUsersSelector = (state: AppStateType): Array<UserType> => {
   return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
   return users.filter((u) => true);
});

export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
   return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
   return state.usersPage.followingInProgress;
};
