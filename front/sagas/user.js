import {
  all,
  call,
  fork,
  put,
  delay,
  task,
  takeLatest,
} from "@redux-saga/core/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from "../reducers/user";

// saga Action ///////////////////////////////
function loginAPI(data) {
  return axios.post("http://localhost:4000/user/login");
}

function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data);

    yield delay(1000);
    const dummyUser = {
      email: action.data.email,
      password: action.data.password,
    };

    yield put({
      type: LOG_IN_SUCCESS,
      data: dummyUser,
      // data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      data: error.result.data,
    });
  }
}
//////////////////////////////////////////////

// watchFunction /////////////////////////////
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin)]);
}
