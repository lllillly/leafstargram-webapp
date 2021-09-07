import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  /////////////////
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "../reducers/user";

// Saga Action/////////////////////////////
function loginAPI(data) {
  return axios.post("/api/user/signin", data);
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

// Saga Action/////////////////////////////
function loadMyInfoAPI(data) {
  return axios.post("/api/user/loadMyInfo");
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      data: error.response.data,
    });
  }
}
///////////////////////////////////////////

// watchFunction//////////////////////////
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), //
    fork(watchLoadMyInfo), //
  ]);
}
