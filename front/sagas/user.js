import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  /////////////////
} from "../reducers/user";

// Saga Action/////////////////////////////
function loginAPI(data) {
  return axios.post("http://localhost:4000/api/user/signin", data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      data: error.response.data,
    });
  }
}
///////////////////////////////////////////

// watchFunction//////////////////////////
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), //
  ]);
}
