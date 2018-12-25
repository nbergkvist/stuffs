import React from "react";
import { connect } from "react-redux";
import { isValid, setSubmitFailed } from "redux-form";
import actions from "./actions";
import GetUserForm from "./get-user-form";

const { requestUserInfo } = actions;

const GetUser = ({ fetchUserData }) => (
  <div>
    76561197962883293, "76561197960286296", 76561197960350381
    <GetUserForm requestUserInfo={fetchUserData} />
    <button
      type="submit"
      className="button-user-form"
      onClick={isValid ? fetchUserData : setSubmitFailed}
    >
      Hämta
    </button>
  </div>
);

const mapStateToProps = state => ({
  isValid: isValid("getUserForm")(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(requestUserInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetUser);
