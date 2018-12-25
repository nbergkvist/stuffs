import { fromJS, Set, findIndex } from "immutable";
import constants from "./constants";

const {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE
} = constants;

const initialState = fromJS({
  friends: null,
  games: null,
  loading: false,
  allGames: null
});

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      newState = newState.set("games", null);
      newState = newState.set("friends", null);
      newState = newState.set("loading", true);
      return newState;
    case GET_USER_DATA_SUCCESS:
      newState = newState.set("friends", action.friends);
      newState = newState.set("games", action.games);
      newState = newState.set("allGames", action.allGames);
      newState = newState.set("loading", false);
      return newState;
    case GET_USER_DATA_FAILURE:
      newState = newState.set("loading", false);
      return newState;
    default:
      return newState;
  }
};

export default { reducer };
