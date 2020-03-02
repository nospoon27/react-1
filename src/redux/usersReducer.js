const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
   users: []
}
// let initialState = {
//    users: [{
//       id: 1,
//       fullName: 'Dim Zinnatov',
//       photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
//       followed: false,
//       status: 'Sleep',
//       location: {
//          city: 'Ufa',
//          country: 'Russia'
//       }
//    },
//    {
//       id: 2,
//       fullName: 'Dim Zinnatov',
//       photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
//       followed: true,
//       status: 'Sleep',
//       location: {
//          city: 'Spb',
//          country: 'Russia'
//       }
//    },
//    {
//       id: 3,
//       fullName: 'Dim Zinnatov',
//       photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
//       followed: false,
//       status: 'Sleep',
//       location: {
//          city: 'Salavat',
//          country: 'Russia'
//       }
//    },
//    {
//       id: 4,
//       fullName: 'Dim Zinnatov',
//       photoUrl: 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-580x580.png',
//       followed: false,
//       status: 'Sleep',
//       location: {
//          city: 'Moscow',
//          country: 'Russia'
//       }
//    },
//    ]
// };

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case FOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) return {
                  ...u,
                  followed: true
               };
               return u;
            })
         };

      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) return {
                  ...u,
                  followed: false
               };
               return u;
            })
         };

      case SET_USERS:
         return {
            ...state,
            users: [...state.users, ...action.users]
         };

      default:
         return state;
   }
}

export const followAC = (userId) => ({
   type: FOLLOW,
   userId: userId
})
export const unFollowAC = (userId) => ({
   type: UNFOLLOW,
   userId: userId
})
export const setUsersAC = (users) => ({
   type: SET_USERS,
   users: users
})

export default usersReducer;