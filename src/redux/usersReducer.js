import { usersAPI } from "../api/usersAPI";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; 
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId)
            return {
              ...u,
              followed: true
            };
          return u;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId)
            return {
              ...u,
              followed: false
            };
          return u;
        })
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
        : state.followingInProgress.filter(id => id != action.userId)
      }

    default:
      return state;
  }
};

export const followSuccess = (userId) => ({
  type: FOLLOW,
  userId: userId
});
export const unfollowSuccess = (userId) => ({
  type: UNFOLLOW,
  userId: userId
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users: users
});
export const setCurrentPage = (newCurrentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage: newCurrentPage
});
export const setUsersTotalCount = (totalCount) => ({
   type: SET_USERS_TOTAL_COUNT,
   count: totalCount
});
export const setIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});
export const toggleFollowProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

export const getUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize)
      .then((data) => {
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
      });
  }
}

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowProgress(true, userId));
    usersAPI.follow(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(follow(userId));
      }
      dispatch(toggleFollowProgress(false, userId));
    });
  }
}

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowProgress(true, userId));
    usersAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollow(userId));
      }
      dispatch(toggleFollowProgress(false, userId));
    });
  }
}

export default usersReducer;
