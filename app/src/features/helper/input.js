/* eslint-disable react/forbid-prop-types */
import React from "react";

const Input = ({ input, ...rest }) => {
  return (
    <div className="input">
      <input {...rest} {...input} />
    </div>
  );
};

export default Input;
