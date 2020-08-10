import { usersAPI } from "../api/usersAPI";
import { updateObjectInArray } from "../utils/objectHelpers";
import { UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; 
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> // array of users id
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users]
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };

    case SET_USERS_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.count
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching 
        ? [...state.followingInProgress, action.userId] 
        : state.followingInProgress.filter(id => id !== action.userId)
      }

    default:
      return state;
  }
};
type FollowSuccessActionType = {
  type: typeof FOLLOW,
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId: userId
});
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW,
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId: userId
});
type SetUsersActionType = {
  type: typeof SET_USERS,
  userId: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users: users
});
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}
export const setCurrentPage = (newCurrentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage: newCurrentPage
});
type SetUsersTotalCountActionType = {
  type: typeof SET_USERS_TOTAL_COUNT,
  count: number
}
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountActionType => ({
   type: SET_USERS_TOTAL_COUNT,
   count: totalCount
});
type SetIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});
type ToggleFollowProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean, 
  userId: number
}
export const toggleFollowProgress = (isFetching: boolean, userId: number): ToggleFollowProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(setIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setUsersTotalCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};


export const unfollow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export default usersReducer;
