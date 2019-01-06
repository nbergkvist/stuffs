import React from "react";
import { connect } from "react-redux";
import { isValid, setSubmitFailed } from "redux-form";
import actions from "./actions";
import GetUserForm from "./get-user-form";

const { requestUserInfo } = actions;

const GetUser = ({ fetchUserData }) => (
  <div className="form-container">
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
