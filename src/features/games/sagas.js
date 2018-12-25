import { put, takeLatest, call, select, all } from "redux-saga/effects";
import constants from "./constants";
import { getAllGames, getCompareGames, getGames } from "../user/selectors";
import service from "./service";
import { getSavedFriends, getCompareList } from "./selectors";
import actions from "./actions";

const { startCompare } = actions;

const {
  GET_FRIEND_COMPARE_REQUEST,
  ADD_COMPARE_FRIEND_ID,
  SAVE_FRIEND,
  REMOVE_FRIEND_COMPARE,
  REMOVE_COMPARE_FRIEND_ID,
  LOADING_COMPARE_DONE
} = constants;

const { getFriendsGames } = service;

export function* compareFriendWorker(data) {
  try {
    const friendId = data.friendId;
    const allGames = yield select(getAllGames);
    const friendGames = yield call(getFriendsGames, friendId);
    const savedFriends = yield select(getSavedFriends);
    const compareGames = yield select(getCompareGames);
    let friendFound = false;
    let games = [];
    savedFriends.map(friend => {
      if (friend.friendId === friendId) {
        friendFound = true;
        games = friend.games;
      }
    });
    if (!friendFound) {
      friendGames.map(game => {
        allGames.applist.apps.find(element => {
          if (element.appid === game.appid) {
            const newListItem = { appid: game.appid, name: element.name };
            games.push(newListItem);
          }
        });
      });
      yield put({
        type: SAVE_FRIEND,
        friendId,
        friend: { friendId, games }
      });
    }

    const newCompare = [];
    compareGames.map(compGame =>
      games.map(game => {
        if (compGame.appid === game.appid) {
          const newItem = { appid: game.appid, name: game.name };
          newCompare.push(newItem);
        }
      })
    );

    yield put({ type: "UPDATE_COMPARE_GAMES", newCompare });

    yield put({
      type: ADD_COMPARE_FRIEND_ID,
      friendId
    });
    yield put({ type: LOADING_COMPARE_DONE });
  } catch (error) {
    yield put({ type: "nope_add", error });
  }
}

function* removeFriendCompareWorker(data) {
  try {
    const friendId = data.friendId;
    yield put({ type: REMOVE_COMPARE_FRIEND_ID, friendId });
    const newCompare = yield select(getGames);
    yield put({ type: "UPDATE_COMPARE_GAMES", newCompare });
    const compareList = yield select(getCompareList);
    const actions = [];
    compareList.map(cl => {
      if (cl.steamId !== friendId) {
        actions.push({ type: GET_FRIEND_COMPARE_REQUEST, friendId });
      }
    });
    console.log(actions);
    yield all(actions.map(ac => put(ac)));
  } catch (error) {
    yield put({ type: "nope_remove", error });
  }
}

function* compareFriendWatcher() {
  yield takeLatest(GET_FRIEND_COMPARE_REQUEST, compareFriendWorker);
}

function* removeFriendCompareWatcher() {
  yield takeLatest(REMOVE_FRIEND_COMPARE, removeFriendCompareWorker);
}

export default { compareFriendWatcher, removeFriendCompareWatcher };
