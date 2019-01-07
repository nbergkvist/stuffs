import { put, takeLatest, call, select } from "redux-saga/effects";
import constants from "./constants";
import { getCompareGames, getGames } from "../user/selectors";
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
  LOADING_COMPARE_DONE,
  LOADING_REMOVE_DONE,
  READD_FRIEND_COMPARE
} = constants;

const { getFriendsGames } = service;

export function* compareFriendWorker(data) {
  try {
    const friendId = data.friendId;
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
        const newListItem = {
          appid: game.appid,
          name: game.name,
          logo: game.img_logo_url
        };
        games.push(newListItem);
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
          const newItem = {
            appid: game.appid,
            name: game.name,
            logo: game.logo
          };
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
    yield put({ type: LOADING_COMPARE_DONE });
    yield put({ type: "nope_add", error });
  }
}

function* removeFriendCompareWorker(data) {
  try {
    const { friendId } = data;
    yield put({ type: REMOVE_COMPARE_FRIEND_ID, friendId });
    let newCompare = yield select(getGames);
    yield put({ type: "UPDATE_COMPARE_GAMES", newCompare });
    const compareList = yield select(getCompareList);
    const savedFriends = yield select(getSavedFriends);
    compareList.map(cl => {
      if (cl.steamId !== friendId) {
        savedFriends.map(sf => {
          if (sf.friendId === cl.steamId) {
            const compareGames = [];
            newCompare.map(compGame =>
              sf.games.map(game => {
                if (compGame.appid === game.appid) {
                  const newItem = {
                    appid: game.appid,
                    name: game.name,
                    logo: game.logo
                  };
                  compareGames.push(newItem);
                }
              })
            );
            newCompare = compareGames;
          }
        });
      }
    });
    yield put({ type: "UPDATE_COMPARE_GAMES", newCompare });
    yield put({ type: LOADING_REMOVE_DONE });
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

export default {
  compareFriendWatcher,
  removeFriendCompareWatcher
};
