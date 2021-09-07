import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FEED_IMAGE_UPLOAD_REQUEST,
  FEED_IMAGE_UPLOAD_SUCCESS,
  FEED_IMAGE_UPLOAD_FAILURE,
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
///////////////////////////////////////////

// watchFunction//////////////////////////
function* watchFeedImage() {
  yield takeLatest(FEED_IMAGE_UPLOAD_REQUEST, feedImage);
}

export default function* feedSaga() {
  yield all([
    fork(watchFeedImage), //
  ]);
}
