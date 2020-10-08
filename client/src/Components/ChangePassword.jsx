import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import validator from "validator";
import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { ChangeUserPassword } from "../actions/UserActions/ChangePassword";
import M from "materialize-css";
import "../styles/EditProfile.css";
import UserPhoto from "./Home/Posts/UserPhoto";

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState({
    oldPassword: { value: null, isCorrect: true, message: "" },
    newPassword: { value: null, isCorrect: false, message: "" },
    confirmPassword: { value: null, isCorrect: false, message: "" },
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const newPassHoverRef = useRef(null);
  const confirmPassNameHoverRef = useRef(null);

  useEffect(() => {
    M.Tooltip.init(newPassHoverRef.current);
    M.Tooltip.init(confirmPassNameHoverRef.current);
  });

  const handleNewPassword = (value) => {
    if (value === "" || !value) {
      setPassword({
        ...password,
        newPassword: { value: value, isCorrect: false, message: "" },
      });
    } else if (
      validator.matches(
        value,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
      )
    ) {
      setPassword({
        ...password,
        newPassword: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setPassword({
        ...password,
        newPassword: {
          value: value,
          isCorrect: false,
          message: `Password Should<br>
          *contain altest 1 uppercase<br>
          *contain atleast 1 lowercase<br>
          *contain altest 1 number<br>
          *contain atleast 1 special char<br>
          *length from 8 to 20`,
        },
      });
    }
  };

  const handleConfirmPassword = (value) => {
    if (value === "" || !value) {
      setPassword({
        ...password,
        confirmPassword: { value: value, isCorrect: false, message: "" },
      });
    } else if (value === password.newPassword.value) {
      setPassword({
        ...password,
        confirmPassword: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setPassword({
        ...password,
        confirmPassword: {
          value: value,
          isCorrect: false,
          message: "Both Passwords are<br>Not Same",
        },
      });
    }
  };

  const handleHover = (field, ref) => {
    if (field.value === "" || !field.value) {
      return;
    }
    if (field.isCorrect) {
      console.log(field);
      return (
        <a
          ref={ref}
          className="tooltipped"
          data-position="right"
          data-delay="50"
          data-html="true"
          data-tooltip={field.message}
        >
          <i className="material-icons prefix green-text">check_circle</i>
        </a>
      );
    } else if (!field.isCorrect) {
      return (
        <a
          ref={ref}
          className="tooltipped"
          data-position="right"
          data-delay="50"
          data-html="true"
          data-tooltip={field.message}
        >
          <i className="material-icons prefix red-text">highlight_off</i>
        </a>
      );
    }
  };

  useEffect(() => {
    if (
      password.oldPassword.isCorrect &&
      password.newPassword.isCorrect &&
      password.confirmPassword.isCorrect
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.oldPassword.value || password.oldPassword.value === "") {
      return setPassword({
        ...password,
        oldPassword: {
          value: null,
          isCorrect: false,
          message: "Old password can't be none",
        },
      });
    }
    ChangeUserPassword({
      oldPassword: password.oldPassword.value,
      newPassword: password.newPassword.value,
    });
  };

  return (
    <div className="change-password">
      <div id="changepassprof">
        <UserPhoto
          height="60px"
          width="60px"
          src={user.user.userDetails.profilePic}
        />
        <h5 style={{ marginLeft: "20px" }}>{user.user.name}</h5>
      </div>

      <div id="editdetails">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="oldpassword" className="label-area">
              Old Password
            </label>
            <input
              required
              type="password"
              className="input-area"
              value={password.oldPassword.value}
              onChange={(e) =>
                setPassword({
                  ...password,
                  oldPassword: {
                    ...password.oldPassword,
                    value: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <label htmlFor="newpassword" className="label-area">
              New Password
            </label>
            <div className="edit-input-div">
              <input
                required
                type="password"
                className="input-area"
                value={password.newPassword.value}
                onChange={(e) => handleNewPassword(e.target.value)}
              />
              {handleHover(password.newPassword, newPassHoverRef)}
            </div>
          </div>

          <div>
            <label htmlFor="confirmnewpassword" className="label-area">
              Confirm New Password
            </label>
            <div className="edit-input-div">
              <input
                required
                type="password"
                className="input-area"
                value={password.confirmPassword.value}
                onChange={(e) => handleConfirmPassword(e.target.value)}
              />
              {handleHover(password.confirmPassword, confirmPassNameHoverRef)}
            </div>
          </div>
            <div id="resetpasswordbtn">
          <button
            className="btn waves-effect waves-light #0288d1 light-blue darken-2"
            disabled={isDisabled}
            type="submit"
          >
            Change Password
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
