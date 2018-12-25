import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Input from "../helper/input";

let GetUserForm = ({ handleSubmit, requestUserInfo, steamId }) => (
  <form onSubmit={handleSubmit(requestUserInfo)}>
    <Field name="steamId" component={Input} type="tel" placeholder={steamId} />
  </form>
);

GetUserForm.defaultProps = {
  steamId: "Steam ID",
  requestUserInfo: undefined
};

const mapStateToProps = state => ({});

GetUserForm = reduxForm({
  form: "getUserForm",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepValues: true
})(GetUserForm);

export default connect(mapStateToProps)(GetUserForm);
