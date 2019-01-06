import React, { Component } from "react";
import { connect } from "react-redux";
import { GetUser, selectors as userSelectors } from "./features/user";
import { UserGames } from "./features/games";
import { UserFriends, FriendsCompared } from "./features/friends";
import "./App.css";

const { getGames, getFriends, getLoading } = userSelectors;

const App = ({ games, friends, loading, getCompareLoadingState }) => (
  <div className="site">
    {loading && (
      <div className="loading-div">
        <div className="loader" />
      </div>
    )}
    <div className="top-bar">
      <GetUser />
    </div>
    <div className="content">
      <div className="friend-list">
        {friends && <UserFriends friends={friends} />}
      </div>
      <div className="game-list">
        {friends && <FriendsCompared friends={friends} />}
        {games && <UserGames />}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  games: getGames(state),
  friends: getFriends(state),
  loading: getLoading(state)
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
