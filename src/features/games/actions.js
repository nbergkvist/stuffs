import constants from "./constants";

const { ADD_COMPARE_FRIEND_ID, GET_FRIEND_COMPARE_REQUEST } = constants;

const startCompare = value => ({
  type: GET_FRIEND_COMPARE_REQUEST,
  friendId: value
});

const addToCompare = value => ({
  type: ADD_COMPARE_FRIEND_ID,
  friendId: value
});

export default { addToCompare, startCompare };
