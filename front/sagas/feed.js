import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FEED_IMAGE_UPLOAD_REQUEST,
  FEED_IMAGE_UPLOAD_SUCCESS,
  FEED_IMAGE_UPLOAD_FAILURE,
} from "../reducers/feed";
import {
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAILURE,
} from "../reducers/feed";
import {
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAILURE,
} from "../reducers/feed";

// Saga Action/////////////////////////////
function feedImageAPI(data) {
  return axios.post("/api/feed/image", data);
}

function* feedImage(action) {
  try {
    const result = yield call(feedImageAPI, action.data);

    yield put({
      type: FEED_IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FEED_IMAGE_UPLOAD_FAILURE,
      data: error.response.data,
    });
  }
}

//

function feedCreateAPI(data) {
  return axios.post("/api/feed/create", data);
}

function* feedCreate(action) {
  try {
    const result = yield call(feedCreateAPI, action.data);
    // action.data : feedcreate의 dispatch의 data(=senddata) 를 가리킴

    yield put({
      type: FEED_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FEED_CREATE_FAILURE,
      data: error.response.data,
    });
  }
}

//

function feedListAPI(data) {
  return axios.get("/api/feed/list", data);
}

function* feedList(action) {
  try {
    const result = yield call(feedListAPI, action.data);

    yield put({
      type: FEED_LIST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FEED_LIST_FAILURE,
      data: error.response.data,
    });
  }
}

///////////////////////////////////////////

// watchFunction//////////////////////////
function* watchFeedImage() {
  yield takeLatest(FEED_IMAGE_UPLOAD_REQUEST, feedImage);
}

function* watchFeedCreate() {
  yield takeLatest(FEED_CREATE_REQUEST, feedCreate);
}

function* watchFeedList() {
  yield takeLatest(FEED_LIST_REQUEST, feedList);
}

export default function* feedSaga() {
  yield all([
    fork(watchFeedImage), //
    fork(watchFeedCreate), //
    fork(watchFeedList),
  ]);
}
