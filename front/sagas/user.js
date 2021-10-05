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
  /////////////////
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
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

// Saga Action/////////////////////////////
function signUpAPI(data) {
  return axios.post("/api/user/signup", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);

    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
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

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), //
    fork(watchLoadMyInfo), //
    fork(watchSignUp), //
  ]);
}
