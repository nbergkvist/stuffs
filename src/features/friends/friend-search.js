import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Input from "../helper/input";

let FriendSearchForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="findFriend"
      component={Input}
      type="text"
      placeholder="Search"
    />
  </form>
);

const mapStateToProps = state => ({
  initialValues: { findFriend: "" }
});

FriendSearchForm = reduxForm({
  form: "friendSearch",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepValues: true
})(FriendSearchForm);

export default connect(mapStateToProps)(FriendSearchForm);
