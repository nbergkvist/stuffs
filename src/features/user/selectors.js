import { Set } from "immutable";

export const getGames = ({ user }) => user.get("games");
export const getAllGames = ({ user }) => user.get("allGames");
export const getFriends = ({ user }) => user.get("friends");
export const getLoading = ({ user }) => user.get("loading");

export default {
  getGames,
  getFriends,
  getLoading,
  getAllGames
};
