const startCompare = value => ({
  type: "GET_FRIEND_COMPARE_REQUEST",
  friendId: value
});

const removeFromCompare = value => ({
  type: "REMOVE_FRIEND_COMPARE",
  friendId: value
});

export default { startCompare, removeFromCompare };
