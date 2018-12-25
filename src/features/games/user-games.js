import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCompareGames } from "../user/selectors";
import { getCompareLoadingState } from "./selectors";

class UserGames extends PureComponent {
  render() {
    const {
      compareGames,
      startCompare,
      removeFromCompare,
      getCompareLoadingState
    } = this.props;
    const gameList = compareGames.map(game => {
      return (
        <div key={game.appid} className="single-game">
          <span>{game.name}</span>
        </div>
      );
    });
    return (
      <div className="game-container">
        {getCompareLoadingState && (
          <div className="loading-div">
            <div className="loader" />
          </div>
        )}
        {!getCompareLoadingState && gameList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  compareGames: getCompareGames(state),
  getCompareLoadingState: getCompareLoadingState(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGames);
