import { apiConstants } from "../helper";

const { BASE_STEAM_GET_GAMES } = apiConstants;

const getFriendsGames = friendId =>
  fetch(BASE_STEAM_GET_GAMES + friendId)
    .then(res => res.json())
    .then(data => {
      return data.response.games;
    });

export default {
  getFriendsGames
};
