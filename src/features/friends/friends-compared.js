import React, { PureComponent } from "react";
import { connect } from "react-redux";
import actions from "./actions";
import { getCompareList } from "../games/selectors";

class FriendsCompared extends PureComponent {
  render() {
    const { friends, compareIds, removeFromCompare } = this.props;
    const friendsList = compareIds.map(ci => {
      let compareName = "";
      let compareAvatar = "";
      const compareId = ci.steamId;
      friends.map(friend => {
        if (friend.steamId === ci.steamId) {
          compareName = friend.name;
          compareAvatar = friend.avatar;
        }
      });
      return (
        <button
          className="compare-button"
          type="button"
          key={compareId}
          onClick={() => removeFromCompare(compareId)}
        >
          <img alt="" src={compareAvatar} />
          <span className="friend-name">{compareName}</span>
          <span className="compare-remove">x</span>
        </button>
      );
    });
    return (
      <div className="compare-list">
        <div className="compare-text-container">
          <span className="compare-text">Comparing with friends: </span>
        </div>
        {friendsList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  compareIds: getCompareList(state)
});

const mapDispatchToProps = dispatch => ({
  removeFromCompare: value => {
    dispatch(actions.removeFromCompare(value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsCompared);
