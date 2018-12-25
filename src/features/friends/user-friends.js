import React from "react";
import { connect } from "react-redux";

const UserFriends = friends => {
  const friendsList = friends.friends.map(friend => (
    <div key={friend.steamid}>{friend.name}, </div>
  ));
  return <div>{friendsList}</div>;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFriends);
