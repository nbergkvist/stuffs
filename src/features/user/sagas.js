import { call, put, takeLatest, select, all } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import constants from "./constants";
import service from "./service";

const {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE
} = constants;

const {
  getUserFriends,
  getUserGames,
  getAllSteamGames,
  getFriendName
} = service;

export function* getUserDataWorker() {
  try {
    const steamId = yield select(getFormValues("getUserForm"));
    const userFriends = yield call(getUserFriends, steamId);
    const userGames = yield call(getUserGames, steamId);
    const allGames = yield call(getAllSteamGames);

    const games = [];
    userGames.map(game => {
      allGames.applist.apps.find(element => {
        if (element.appid === game.appid) {
          const newListItem = { appid: game.appid, name: element.name };
          games.push(newListItem);
        }
      });
    });

    // const friends = [];
    const friends = yield all(
      userFriends.map(friend => {
        const friendId = friend.steamid;
        return call(getFriendName, friendId);
      })
    );

    yield put({
      type: GET_USER_DATA_SUCCESS,
      friends,
      games,
      allGames,
      steamId
    });
  } catch (error) {
    yield put({ type: GET_USER_DATA_FAILURE, error });
  }
}

function* fetchUserDataWatcher() {
  yield takeLatest(GET_USER_DATA_REQUEST, getUserDataWorker);
}

export default { fetchUserDataWatcher };
