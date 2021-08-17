import { produce } from "immer";
//불변성을 찾아주는 패키지

export const initialState = {
  me: null,
  /////////////////
  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const user = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.st_loginLoading = true;
        draft.st_loginDone = false;
        draft.st_loginError = null;
      }
      case LOG_IN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.st_loginError = null;
        draft.me = action.data;
      }
      case LOG_IN_FAILURE: {
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.data;
      }
      ///////////////////////////////////////////////

      default:
        break;
    }
  });

export default user;
