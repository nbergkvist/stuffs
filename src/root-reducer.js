import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { reducer as userReducer } from "./features/user";
import { reducer as gamesReducer } from "./features/games";

const rootReducer = combineReducers({
  form,
  user: userReducer.reducer,
  game: gamesReducer.reducer
});

export default rootReducer;
