import { all } from "redux-saga/effects";
import { sagas as userSaga } from "./features/user";
import { sagas as gamesSaga } from "./features/games";

function* rootSaga() {
  yield all([
    userSaga.fetchUserDataWatcher(),
    gamesSaga.compareFriendWatcher(),
    gamesSaga.removeFriendCompareWatcher()
  ]);
}

export default rootSaga;
