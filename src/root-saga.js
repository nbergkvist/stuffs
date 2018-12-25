import { all } from "redux-saga/effects";
import { sagas as userSaga } from "./features/user";
import { sagas as gamesSaga } from "./features/games";

function* rootSaga() {
  yield all([userSaga.fetchUserDataWatcher()]);
  yield all([gamesSaga.testWatcher()]);
}

export default rootSaga;
