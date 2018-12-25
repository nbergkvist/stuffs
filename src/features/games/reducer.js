import { fromJS, Set, findIndex } from "immutable";
import constants from "./constants";

const {
  ADD_COMPARE_FRIEND_ID,
  REMOVE_COMPARE_FRIEND_ID,
  GET_FRIEND_COMPARE_REQUEST
} = constants;

const initialState = fromJS({
  compare: [],
  savedFriends: []
});

const reducer = (state = initialState, action) => {
  let newState = state;
  let index;
  switch (action.type) {
    case GET_FRIEND_COMPARE_REQUEST:
      return newState;
    case ADD_COMPARE_FRIEND_ID:
      newState = newState.update("compare", compare =>
        compare.push({ steamId: action.friendId })
      );
      newState = newState.update("savedFriends", compare =>
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
    default:
      return newState;
  }
};

export default { reducer };
