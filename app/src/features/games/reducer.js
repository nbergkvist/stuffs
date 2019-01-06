import { fromJS, Set, findIndex } from "immutable";
import constants from "./constants";

const {
  ADD_COMPARE_FRIEND_ID,
  REMOVE_COMPARE_FRIEND_ID,
  SAVE_FRIEND,
  LOADING_COMPARE_DONE,
  REMOVE_FRIEND_COMPARE,
  GET_FRIEND_COMPARE_REQUEST,
  LOADING_REMOVE_DONE,
  REMOVE_ALL_COMPARE
} = constants;

const initialState = fromJS({
  compare: [],
  savedFriends: [],
  loading: false
});

const reducer = (state = initialState, action) => {
  let newState = state;
  let index;
  switch (action.type) {
    case REMOVE_FRIEND_COMPARE:
      newState = newState.set("loading", true);
      return newState;
    case GET_FRIEND_COMPARE_REQUEST:
      newState = newState.set("loading", true);
      return newState;
    case SAVE_FRIEND:
      newState = newState.update("savedFriends", compare =>
        compare.push(action.friend)
      );
      return newState;
    case ADD_COMPARE_FRIEND_ID:
      newState = newState.update("compare", compare =>
        compare.push({ steamId: action.friendId })
      );

      // newState = newState.setIn(["savedFriends", index, "steamId"], 4);
      return newState;
    case REMOVE_COMPARE_FRIEND_ID:
      index = newState.get("compare").findIndex(listItem => {
        return listItem.steamId === action.friendId;
      });
      newState = newState.deleteIn(["compare", index]);
      return newState;
    case LOADING_COMPARE_DONE:
      newState = newState.set("loading", false);
      return newState;
    case LOADING_REMOVE_DONE:
      newState = newState.set("loading", false);
      return newState;
    default:
      return newState;
  }
};

export default { reducer };
