import React from "react";
import "../../styles/Signup.css";

const AuthButton = ({ handleClick, isdisabled, ...restProps }) => {
  return (
    <button
    {...restProps}
      className={
        isdisabled
          ? "btn waves-effect waves-light auth-button disabled"
          : "btn waves-effect waves-light auth-button #bbdefb blue lighten-1"
      }
      onClick={handleClick ? ()=>handleClick() : null}
    ></button>
  );
};

export default AuthButton;
