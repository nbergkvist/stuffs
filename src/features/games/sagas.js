import { put, takeLatest } from "redux-saga/effects";
import constants from "./constants";

const { GET_FRIEND_COMPARE_REQUEST } = constants;

export function* testWorker() {
  try {
    console.log("plssss");
    yield put({
      type: "GET_USER_DATA_SUCCESS2"
    });
  } catch (error) {
    yield put({ type: "GET_USER_DATA_FAILURE2", error });
  }
}

function* testWatcher() {
  yield takeLatest(GET_FRIEND_COMPARE_REQUEST, testWorker);
}

export default { testWatcher };
