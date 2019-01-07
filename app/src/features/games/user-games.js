import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCompareGames } from "../user/selectors";
import { getCompareLoadingState } from "./selectors";

class UserGames extends PureComponent {
  render() {
    const { compareGames, getCompareLoadingState } = this.props;
    const gameList = compareGames.map(game => {
      if (
        game.name.toLowerCase().indexOf(" test") === -1 &&
        game.name.toLowerCase().indexOf("beta") === -1 &&
        game.name.toLowerCase().indexOf("alpha") === -1 &&
        game.name.toLowerCase().indexOf("tutorial") === -1 &&
        game.name.toLowerCase().indexOf("dedicated server") === -1 &&
        game.name.toLowerCase().indexOf("unstable") === -1
      ) {
        const { appid, logo } = game;
        const sectionStyle = {
          height: "100%",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${logo}.jpg)`
        };
        return (
          <div key={game.appid} className="single-game">
            <span>{game.name}</span>
            <div style={sectionStyle} />
          </div>
        );
      }
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
