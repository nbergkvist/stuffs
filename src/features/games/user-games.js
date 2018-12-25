import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getAllGames } from "../user/selectors";
import actions from "./actions";

class UserGames extends PureComponent {
  render() {
    const { games, addToCompare } = this.props;
    const gameList = games.map(game => {
      return <div key={game.appid}>{game.name} </div>;
    });
    return (
      <div>
        <button type="button" onClick={() => addToCompare(76561197960286296)}>
          Test
        </button>
        {gameList}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCompare: value => dispatch(actions.startCompare(value))
});

// addToCompare: value => {
//   dispatch(actions.addToCompare(value));
//   dispatch(actions.startCompare(value));
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGames);
