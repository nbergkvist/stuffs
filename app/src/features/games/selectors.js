export const getSavedFriends = ({ game }) => game.get("savedFriends");
export const getCompareList = ({ game }) => game.get("compare");
export const getCompareLoadingState = ({ game }) => game.get("loading");

export default {
  getSavedFriends,
  getCompareList
};
