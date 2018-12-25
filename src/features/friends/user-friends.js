import React, { PureComponent } from "react";
import classNames from "classnames";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";
import actions from "./actions";
import { getCompareList } from "../games/selectors";
import FriendSearchForm from "./friend-search";

class UserFriends extends PureComponent {
  render() {
    const {
      friends,
      startCompare,
      compareIds,
      removeFromCompare,
      searchInput
    } = this.props;
    const friendsList = friends.map(friend => {
      let friendAdded = false;
      if (searchInput) {
        if (friend.name.toLowerCase().indexOf(searchInput.findFriend) !== -1) {
          compareIds.map(ci => {
            if (ci.steamId === friend.steamId) friendAdded = true;
          });
          return (
            <button
              className={classNames("friend-button", {
                "friend-button-chosen": friendAdded
              })}
              type="button"
              key={friend.steamId}
              onClick={() =>
                friendAdded
                  ? removeFromCompare(friend.steamId)
                  : startCompare(friend.steamId)
              }
            >
              {friend.name}
            </button>
          );
        }
      }
    });
    return (
      <div>
        <div className="friend-search">
          <FriendSearchForm />
        </div>
        {friendsList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  compareIds: getCompareList(state),
  searchInput: getFormValues("friendSearch")(state)
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
