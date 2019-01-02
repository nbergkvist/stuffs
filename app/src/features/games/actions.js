import constants from "./constants";

const {
  ADD_COMPARE_FRIEND_ID,
  GET_FRIEND_COMPARE_REQUEST,
  REMOVE_FRIEND_COMPARE
} = constants;

const startCompare = value => ({
  type: GET_FRIEND_COMPARE_REQUEST,
  friendId: value
});

const addToCompare = (friendId, friend) => ({
  type: ADD_COMPARE_FRIEND_ID,
  friendId,
  friend
});

const removeFromCompare = value => ({
  type: REMOVE_FRIEND_COMPARE,
  friendId: value
});

export default { addToCompare, startCompare, removeFromCompare };
