const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; 

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  followingInProgress: true,
  isFetching: true
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

    default:
      return state;
  }
};

export const follow = (userId) => ({
  type: FOLLOW,
  userId: userId
});
export const unfollow = (userId) => ({
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
export default usersReducer;
