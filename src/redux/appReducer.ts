import { getAuthUserData } from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
const UNSET_GLOBAL_ERROR = 'UNSET_GLOBAL_ERROR'; 

type InilialStateType = {
   initialized: boolean
}

let initialState: InilialStateType = {
   initialized: false
};

const appReducer = (state = initialState, action: any): InilialStateType => {
   switch(action.type){
      case SET_INITIALIZED_SUCCESS:
         return {
            ...state,
            initialized: true
         };
         // case SET_GLOBAL_ERROR:
         //    return {
         //       ...state,
         //       globalError: action.globalError
         //    }
         // case UNSET_GLOBAL_ERROR:
         //    return {
         //       ...state,
         //       globalError: null
         //    }
       default:
          return{...state};
   }
};

type InitializedSuccessType = {
   type: typeof SET_INITIALIZED_SUCCESS
}

export const initializedSuccess = () => ({
  type: SET_INITIALIZED_SUCCESS,
});
export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
   Promise.all([promise])
      .then(() => {
      dispatch(initializedSuccess());
   });
}
export const setGlobalError = (error: string) => (dispatch: any) => {
   dispatch({
      type: SET_GLOBAL_ERROR,
   action: {
      globalError: error
   }});
   setTimeout(unsetGlobalError, 5000);
}
export const unsetGlobalError = () => ({
   type: UNSET_GLOBAL_ERROR,
   action: {}
})
export default appReducer;