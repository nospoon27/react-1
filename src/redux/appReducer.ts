import { getAuthUserData } from "./authReducer";
import { BaseThunkType, InferActionTypes } from "./reduxStore";

let initialState = {
   initialized: false
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
   switch(action.type){
      case 'SN/APP/SET_INITIALIZED_SUCCESS':
         return {
            ...state,
            initialized: true
         };
       default:
          return{...state};
   }
};

type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
   initializedSuccess: () => ({ type: 'SN/APP/SET_INITIALIZED_SUCCESS' }) as const,
}

type ThunkType = BaseThunkType<ActionTypes>;

export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
   Promise.all([promise])
      .then(() => {
      dispatch(actions.initializedSuccess());
   });
}
export default appReducer;