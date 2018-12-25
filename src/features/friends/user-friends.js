import React, { PureComponent } from "react";
import { connect } from "react-redux";
import actions from "./actions";
import { getCompareList } from "../games/selectors";

class UserFriends extends PureComponent {
  render() {
    const { friends, startCompare, compareIds } = this.props;
    {
      const friendsList = friends.map(friend =>
        compareIds.map(ci => {
          if (ci.steamId === friend.steamId) {
            return (
              <div key={friend.steamId}>
                {friend.name}{" "}
                <button
                  type="button"
                  onClick={() => startCompare(friend.steamId)}
                >
                  remove
                </button>{" "}
              </div>
            );
          }
          return (
            <div key={friend.steamId}>
              {friend.name}{" "}
              <button
                type="button"
                onClick={() => startCompare(friend.steamId)}
              >
                add
              </button>{" "}
            </div>
          );
        })
      );
      return <div>{friendsList}</div>;
    }
  }
}

const mapStateToProps = state => ({
  compareIds: getCompareList(state)
});

const mapDispatchToProps = dispatch => ({
  startCompare: value => {
    dispatch(actions.startCompare(value));
  },
  removeFromCompare: value => {
    dispatch(actions.removeFromCompare(value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFriends);
