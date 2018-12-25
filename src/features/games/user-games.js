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
      return <div key={game.appid}>{game.name} </div>;
    });
    return (
      <div>
        <button type="button" onClick={() => startCompare("76561197960350381")}>
          Add: 76561197960350381
        </button>

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
