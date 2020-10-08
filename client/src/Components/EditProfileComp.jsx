import React, { useEffect } from "react";
import { useState, useRef } from "react";
import {
  UpdateProfilePhoto,
  RemoveProfilePhoto,
} from "../actions/UserActions/UpdateProfilePhoto";
import { UpdateUserDetails } from "../actions/UserActions/UpdateDetails";
import M from "materialize-css";
import validator from "validator";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import "../styles/EditProfile.css";
import { VerifyUsername } from "../actions/authActions/VerifyUsername";
import UserPhoto from "./Home/Posts/UserPhoto";
import CircleLoader from "./CircleLoader";
const EditProfileComp = () => {
  const { user, dispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const userpicmodal = useRef(null);
  const picmodal = useRef(null);
  const nameHoverRef = useRef(null);
  const userNameHoverRef = useRef(null);
  const bioHoverRef = useRef(null);
  const emailHoverRef = useRef(null);
  const phoneNumberHoverRef = useRef(null);
  // const history = useHistory();
  useEffect(() => {
    M.Tooltip.init(nameHoverRef.current);
    M.Tooltip.init(userNameHoverRef.current);
    M.Tooltip.init(bioHoverRef.current);
    M.Tooltip.init(emailHoverRef.current);
    M.Tooltip.init(phoneNumberHoverRef.current);
  });
  useEffect(() => {
    M.Modal.init(userpicmodal.current);
  }, []);
  useEffect(() => {
    M.Modal.init(picmodal.current);
  }, []);

  const [userDetails, setUserDetails] = useState({
    name: {
      value: user.user.name,
      isCorrect: true,
      message: "You're Good to Go",
    },
    userName: {
      value: user.user.userName,
      isCorrect: true,
      message: "You're Good to Go",
    },
    email: {
      value: user.user.email,
      isCorrect: true,
      message: "You're Good to Go",
    },
    bio: {
      value: user.user.userDetails.bio,
      isCorrect: true,
      message: "You're Good to Go",
    },
    phoneNumber: {
      value: user.user.phoneNumber,
      isCorrect: true,
      message: "You're Good to Go",
    },
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [updatedphoto, setUpdatedPhoto] = useState("");

  const handleName = (value) => {
    if (validator.isLength(value, { min: 3, max: 15 })) {
      setUserDetails({
        ...userDetails,
        name: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        name: {
          value: value,
          isCorrect: false,
          message: "Name Lenggth should fall<br>in range 3 to 15",
        },
      });
    }
  };

  const handleBio = (value) => {
    if (validator.isLength(value, { min: 0, max: 100 })) {
      setUserDetails({
        ...userDetails,
        bio: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        bio: {
          value: value,
          isCorrect: false,
          message: "Bio should not be more than<br>100 words",
        },
      });
    }
  };

  const handleUserName = async (value) => {
    if (validator.contains(value, " ")) {
      return setUserDetails({
        ...userDetails,
        userName: {
          value: value,
          isCorrect: false,
          message: "Username Should Not<br>Contain White Spaces",
        },
      });
    }
    const isValid = await VerifyUsername(value);
    if (isValid.success || value === user.user.userName) {
      setUserDetails({
        ...userDetails,
        userName: {
          value: value,
          isCorrect: true,
          message: "Username is Available",
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        userName: {
          value: value,
          isCorrect: false,
          message: "Username is Not Available",
        },
      });
    }
  };

  const handleEmail = (value) => {
    if (value === "" || !value) {
      return setUserDetails({
        ...userDetails,
        phoneNumber: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    }
    if (validator.isEmail(value)) {
      setUserDetails({
        ...userDetails,
        email: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        email: {
          value: value,
          isCorrect: false,
          message: "Invalid Email id<br>Please recheck",
        },
      });
    }
  };

  const handlePhoenNumber = (value) => {
    if (value === "" || !value) {
      return setUserDetails({
        ...userDetails,
        phoneNumber: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    }
    if (validator.isMobilePhone(value, "any", { strictMode: true })) {
      setUserDetails({
        ...userDetails,
        phoneNumber: {
          value: value,
          isCorrect: true,
          message: "You're Good to Go",
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        phoneNumber: {
          ...userDetails.phoneNumber,
          value: value,
          isCorrect: false,
          message:
            "Invalid Phone Number<br>plese recheck<br>*include country code<br>Ex: +91xxxxxxxxxx",
        },
      });
    }
  };

  const UpdatePhoto = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("profilepic", updatedphoto);
    await UpdateProfilePhoto(dispatch, { form_data });
    setIsLoading(false);
    M.Modal.getInstance(userpicmodal.current).close();
  };

  const RemovePhoto = async () => {
    await RemoveProfilePhoto(dispatch);
  };

  const handleHover = (field, ref) => {
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
      userDetails.name.isCorrect &&
      userDetails.userName.isCorrect &&
      userDetails.bio.isCorrect &&
      userDetails.email.isCorrect &&
      userDetails.phoneNumber.isCorrect
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const updateUserDetails = () => {
    UpdateUserDetails(dispatch, {
      name: userDetails.name.value,
      bio: userDetails.bio.value,
      userName: userDetails.userName.value,
      email: userDetails.email.value,
      phoneNumber: userDetails.phoneNumber.value
    });
  };

  return (
    <div id="edit-profile">
      <div id="profile">
        <div className="modal-trigger" data-target="pic-modal">
          <UserPhoto
            height="60px"
            width="60px"
            src={user.user.userDetails.profilePic}
          />
        </div>
        <div id="change-profile">
          <h5>{user.user.userName}</h5>
          <div style={{ marginTop: "unset !important", display: "flex" }}>
            <span
              style={{ fontSize: "15px", color: "#405de6" }}
              className="modal-trigger"
              data-target="edit-pic-modal"
            >
              Change your photo
            </span>
            <span
              style={{ fontSize: "15px", color: "#405de6", marginLeft: "20px" }}
              onClick={() => RemovePhoto()}
            >
              Remove your photo
            </span>
          </div>
        </div>
      </div>
      <div id="editdetails">
        <div>
          <label htmlFor="name" className="label-area">
            Name
          </label>
          <div className="edit-input-div">
            <input
              id="name"
              type="text"
              className="input-area"
              value={userDetails.name.value}
              onChange={(e) => handleName(e.target.value)}
            />
            {handleHover(userDetails.name, nameHoverRef)}
          </div>
        </div>
        <div>
          <label htmlFor="userName" className="label-area">
            UserName
          </label>
          <div className="edit-input-div">
            <input
              id="userName"
              type="text"
              className="input-area"
              value={userDetails.userName.value}
              onChange={(e) => handleUserName(e.target.value)}
            />
            {handleHover(userDetails.userName, userNameHoverRef)}
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="label-area">
            Bio
          </label>
          <div className="edit-input-div">
            <input
              id="bio"
              type="text"
              className="input-area"
              value={userDetails.bio.value}
              onChange={(e) => handleBio(e.target.value)}
            />
            {handleHover(userDetails.bio, bioHoverRef)}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label-area">
            Email
          </label>
          <div className="edit-input-div">
            <input
              id="email"
              disabled={user.user.email ? true : false}
              type="text"
              className="input-area"
              value={userDetails.email.value}
              onChange={(e) => handleEmail(e.target.value)}
            />
            {handleHover(userDetails.email, emailHoverRef)}
          </div>
        </div>
        <div>
          <label htmlFor="phonenumber" className="label-area">
            phonenumber
          </label>
          <div className="edit-input-div">
            <input
              id="phonenumber"
              type="text"
              className="input-area"
              disabled={user.user.phoneNumber ? true : false}
              onChange={(e) => handlePhoenNumber(e.target.value)}
            />
            {handleHover(userDetails.phoneNumber, phoneNumberHoverRef)}
          </div>
        </div>

      <div id="resetpasswordbtn">
        <button
          disabled={isDisabled}
          className="btn waves-effect waves-light #0288d1 light-blue darken-2"
          onClick={updateUserDetails}
        >
          Save Details
        </button>
        </div>
      </div>

      <div
        ref={userpicmodal}
        id="edit-pic-modal"
        className="modal"
        style={{ height: "50vmax", width: "50vmax" }}
      >
        {!isLoading ? (
          <div className="input-field post-input">
            <h4 id="storytitle">Change your Photo</h4>
            <form
              onSubmit={(e) => UpdatePhoto(e)}
              encType="multipart/form-data"
            >
              <div className="file-field input-field">
                <div className="btn #0288d1 light-blue darken-2">
                  <span>Upload</span>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={(e) => setUpdatedPhoto(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <button
                type="submit"
                className="btn waves-effect waves-light #0288d1 light-blue darken-2"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <CircleLoader />
        )}
      </div>
      <div
        ref={picmodal}
        id="pic-modal"
        className="modal"
        style={{ height: "500px", width: "500px", borderRadius: "50%" }}
      >
        <UserPhoto
          height="100%"
          width="100%"
          src={user.user.userDetails.profilePic}
        />
      </div>
    </div>
  );
};

export default EditProfileComp;
