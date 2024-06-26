import produce from "immer";

export const initailState = {
  me: null,
  //////////////////////
  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,
  //////////////////////
  st_loadMyInfoLoading: false,
  st_loadMyInfoDone: false,
  st_loadMyInfoErr: null,
  //////////////////////
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpErr: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.st_loginLoading = true;
        draft.st_loginDone = false;
        draft.st_loginError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.st_loginError = null;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.data;
        draft.me = null;
        break;
      }
      //////////////////////////////////////////

      case LOAD_MY_INFO_REQUEST: {
        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = null;
        break;
      }
      case LOAD_MY_INFO_SUCCESS: {
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.st_loadMyInfoError = null;
        draft.me = action.data;
        break;
      }
      case LOAD_MY_INFO_FAILURE: {
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.data;
        draft.me = null;
        break;
      }
      //////////////////////////////////////////

      case SIGN_UP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = false;
        draft.st_signUpError = null;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        draft.st_signUpError = null;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.data;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
