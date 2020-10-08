import React, { useState, useContext, useRef, useEffect } from "react";
import validator from "validator";
import M from "materialize-css";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import AuthCard from "../Components/Auth/AuthCard";
import Logo from "../Components/Auth/Logo";
import AuthInput from "../Components/Auth/AuthInput";
import AuthButton from "../Components/Auth/AuthButton";
import { VerifyUsername } from "../actions/authActions/VerifyUsername";
import { SignUp } from "../actions/authActions/SignUp";

const SignUP = () => {
  const { user, dispatch } = useContext(UserContext);

  const [name, setName] = useState("");
  const [isNameCorrect, setIsNameCorrect] = useState({
    isCorrect: false,
    message: "",
  });

  const [credentials, setCredentials] = useState("");
  const [isCredentialsCorrect, setIsCredentialsCorrect] = useState({
    isCorrect: false,
    message: "",
  });

  const [userName, setUserName] = useState("");
  const [isUserNameCorrect, setIsUserNameCorrect] = useState({
    isCorrect: false,
    message: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState({
    isCorrect: false,
    message: "",
  });

  const [mode, setMode] = useState("");
  const [isdisabled, setIsDisabled] = useState(true);

  const hoverRef = useRef(null);

  useEffect(() => {
    M.Tooltip.init(hoverRef.current);
  });

  const handleName = (value) => {
    setName(value);
    if (validator.isLength(value, { min: 3, max: 15 })) {
      setIsNameCorrect({ isCorrect: true, message: "You're Good to Go" });
    } else {
      setIsNameCorrect({
        isCorrect: false,
        message: "Name Lenggth should fall<br>in range 3 to 15",
      });
    }
  };

  const handleCredendials = (value) => {
    setCredentials(value);
    if (validator.isMobilePhone(value)) {
      if (validator.isMobilePhone(value, "any", { strictMode: true })) {
        setIsCredentialsCorrect({
          isCorrect: true,
          message: "You're Good to Go",
        });
        setMode("phoneNumber");
      } else {
        setIsCredentialsCorrect({
          isCorrect: false,
          message: "include country code<br>Ex: +91xxxxxxxxxx",
        });
      }
    } else if (validator.isEmail(value)) {
      setIsCredentialsCorrect({
        isCorrect: true,
        message: "You're Good to Go",
      });
      setMode("email");
    } else {
      setIsCredentialsCorrect({
        isCorrect: false,
        message: "Incorrect Credentials<br>Please Check again",
      });
    }
  };

  const handleUserName = async (value) => {
    setUserName(value);
    if (validator.contains(value, " ")) {
      return setIsUserNameCorrect({
        isCorrect: false,
        message: "Username Should Not<br>Contain White Spaces",
      });
    }
    const isValid = await VerifyUsername(value);
    if (isValid.success) {
      setIsUserNameCorrect({
        isCorrect: true,
        message: "Username is Available",
      });
    } else {
      setIsUserNameCorrect({
        isCorrect: false,
        message: "Username is Not Available",
      });
    }
  };

  const handlePassword = (value) => {
    setPassword(value);
    if (
      validator.matches(
        value,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
      )
    ) {
      setIsPasswordCorrect({ isCorrect: true, message: "You're Good to Go" });
    } else {
      setIsPasswordCorrect({
        isCorrect: false,
        message: `Password Should<br>
          *contain altest 1 uppercase<br>
          *contain atleast 1 lowercase<br>
          *contain altest 1 number<br>
          *contain atleast 1 special char<br>
          *length from 8 to 20`,
      });
    }
  };

  const handleHover = (field, correct) => {
    if (field === "") {
      return null;
    } else if (correct.isCorrect) {
      return (
        <a
          ref={hoverRef}
          className="tooltipped"
          data-position="right"
          data-delay="50"
          data-html="true"
          data-tooltip={correct.message}
        >
          <i className="material-icons prefix green-text">check_circle</i>
        </a>
      );
    } else if (!correct.isCorrect) {
      return (
        <a
          ref={hoverRef}
          className="tooltipped"
          data-position="right"
          data-delay="50"
          data-html="true"
          data-tooltip={correct.message}
        >
          <i className="material-icons prefix red-text">highlight_off</i>
        </a>
      );
    }
  };

  useEffect(() => {
    if (
      isNameCorrect.isCorrect &&
      isCredentialsCorrect.isCorrect &&
      isUserNameCorrect.isCorrect &&
      isPasswordCorrect.isCorrect &&
      name !== "" &&
      credentials !== "" &&
      userName !== "" &&
      password !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUp(dispatch, {
      name,
      credentials,
      password,
      userName,
      mode: mode,
    }).then((data) => {
      if (data.success) {
        M.toast({ html: data.message, classes: "#8bc34a light-green" });
      } else {
        M.toast({ html: data.error, classes: "#d50000 red accent-4" });
      }
    });
  };
  
  if (user.user) return <Redirect to="/confirm-otp" />;

  return (
    <>
      <AuthCard>
        <Logo />
        <h4 id="signuptext">Sign up to see photos and videos from your friends.</h4>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <AuthInput
              id="name"
              className="input-area"
              type="text"
              required={true}
              handleChange={handleName}
            />
            <label className="auth-label" htmlFor="name">
              Full Name
            </label>
            {handleHover(name, isNameCorrect)}
          </div>
          <div className="input-field">
            <AuthInput
              id="credentials"
              className="input-area"
              type="text"
              required={true}
              handleChange={handleCredendials}
            />
            <label className="auth-label" htmlFor="credentials">
              Email or PhoneNumber
            </label>
            {handleHover(credentials, isCredentialsCorrect)}
          </div>
          <div className="input-field ">
            <AuthInput
              id="username"
              className="input-area"
              type="text"
              required={true}
              handleChange={handleUserName}
            />
            <label className="auth-label" htmlFor="username">
              Username
            </label>
            {handleHover(userName, isUserNameCorrect)}
          </div>
          <div className="input-field">
            <AuthInput
              id="password"
              className="input-area"
              type={showPassword ? "text" : "password"}
              required={true}
              handleChange={handlePassword}
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
                visibility_off
              </i>
            ) : (
              <i
                className="tiny material-icons prefix"
                style={{ marginLeft: "-35px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                visibility
              </i>
            )}
            {handleHover(password, isPasswordCorrect)}
          </div>
          <AuthButton type="submit" isdisabled={isdisabled}>
            Sign Up
          </AuthButton>
        </form>
      </AuthCard>
      <div className="lowerdiv">
        <p>
          Already have an account?
          <Link to="/signin">
            <span style={{ color: "#0288d1", fontSize: "large" }}>Sign In</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUP;
