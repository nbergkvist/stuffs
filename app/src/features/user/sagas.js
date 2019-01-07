import { call, put, takeLatest, select, all } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import constants from "./constants";
import service from "./service";

const {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE
} = constants;

const { getUserFriends, getUserGames, getFriendName } = service;

export function* getUserDataWorker() {
  try {
    const steamId = yield select(getFormValues("getUserForm"));
    const userFriends = yield call(getUserFriends, steamId);
    const userGames = yield call(getUserGames, steamId);

    const games = [];
    userGames.map(game => {
      const newListItem = {
        appid: game.appid,
        name: game.name,
        logo: game.img_logo_url
      };
      games.push(newListItem);
    });

    const friends = [];
    let friendIds = "";
    userFriends.map((friend, index) => {
      if (index === 0) friendIds = friend.steamid;
      else friendIds = `${friendIds},${friend.steamid}`;
    });
    const allFriendNames = yield call(getFriendName, friendIds);
    allFriendNames.map(friend => {
      const newFriend = {
        steamId: friend.steamid,
        name: friend.personaname,
        avatar: friend.avatar
      };
      friends.push(newFriend);
    });

    yield put({
      type: GET_USER_DATA_SUCCESS,
      friends,
      games,
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
