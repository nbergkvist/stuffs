import { apiConstants } from "../helper";

const {
  BASE_STEAM_GET_FRIENDS,
  BASE_STEAM_FRIEND,
  BASE_STEAM_GET_GAMES,
  STEAM_GET_ALL_GAMES,
  STEAM_GET_FRIEND_NAME
} = apiConstants;

const getUserFriends = ({ steamId }) =>
  fetch(BASE_STEAM_GET_FRIENDS + steamId + BASE_STEAM_FRIEND)
    .then(res => res.json())
    .then(data => {
      return data.friendslist.friends;
    });

const getUserGames = ({ steamId }) =>
  fetch(BASE_STEAM_GET_GAMES + steamId)
    .then(res => res.json())
    .then(data => {
      return data.response.games;
    });

const getAllSteamGames = () =>
  fetch(STEAM_GET_ALL_GAMES)
    .then(res => res.json())
    .then(data => {
      return data;
    });

const getFriendName = friendId =>
  fetch(STEAM_GET_FRIEND_NAME + friendId)
    .then(res => res.json())
    .then(data => {
      const list = {
        steamId: friendId,
        name: data.response.players[0].personaname
      };
      return list;
    });

export default {
  getUserFriends,
  getUserGames,
  getAllSteamGames,
  getFriendName
};
