import { apiConstants } from "../helper";

const { BASE_STEAM_GET_GAMES, INCLUDE_APPINFO } = apiConstants;

const getFriendsGames = friendId =>
  fetch(BASE_STEAM_GET_GAMES + friendId + INCLUDE_APPINFO)
    .then(res => res.json())
    .then(data => {
      return data.response.games;
    });

export default {
  getFriendsGames
};
