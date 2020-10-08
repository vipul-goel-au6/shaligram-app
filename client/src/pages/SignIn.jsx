import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { SignIn } from "../actions/authActions/SignIn";
import M from "materialize-css";
import validator from "validator";
import AuthCard from "../Components/Auth/AuthCard";
import AuthInput from "../Components/Auth/AuthInput";
import Logo from "../Components/Auth/Logo";
import AuthButton from "../Components/Auth/AuthButton";
import "../styles/Signup.css";

const SignIN = () => {
  const { user, dispatch } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctMobile, setCorrectMobile] = useState(true);
  const [isdisabled, setIsDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false);

  const hoverRef = useRef(null);

  useEffect(() => {
    M.Tooltip.init(hoverRef.current);
  });

  useEffect(() => {
    if (validator.isMobilePhone(username)) {
      if (!validator.isMobilePhone(username, "any", { strictMode: true })) {
        setCorrectMobile(false);
      }
    } else {
      setCorrectMobile(true);
    }

    if (username !== '' && password !== '' && correctMobile) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    SignIn(dispatch, { username, password });
  };

  if (user.user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AuthCard>
        <Logo />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <AuthInput
              id="username"
              className="input-area"
              type="text"
              required={true}
              handleChange={setUsername}
            />
            <label className="auth-label" htmlFor="email">
              Phone Number, Username or Email
            </label>
            {!correctMobile ? (
              <a
                ref={hoverRef}
                className="tooltipped"
                data-position="right"
                data-delay="50"
                data-html="true"
                data-tooltip="include country code<br>Ex: +91xxxxxxxxxx"
              >
                <i className="material-icons prefix red-text">highlight_off</i>
              </a>
            ) : null}
          </div>
          <div className="input-field">
            <AuthInput
              className="input-area"
              type={showPassword ? "text" : "password"}
              required={true}
              handleChange={setPassword}
            />
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            {showPassword ? (
              <i
                className="tiny material-icons prefix"
                style={{ marginLeft: "-35px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                visibility
              </i>
            ) : (
              <i
                className="tiny material-icons prefix"
                style={{ marginLeft: "-35px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                visibility_off
              </i>
            )}
          </div>
          <AuthButton type="submit" isdisabled={isdisabled}>Sign In</AuthButton>
        <Link to="/reset">
        <a className="waves-effect waves-teal btn-flat">Forgot password ?</a>
          </Link>
              </form>
      </AuthCard>
      <div className="lowerdiv">
        <p>
          Don't have an account?
          <Link to="/signup">
            <span
              style={{
                color: "#0288d1",
                fontSize: "large",
                marginBottom: "10px !important",
              }}
            >
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIN;
