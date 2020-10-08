import React from "react";
import UserPhoto from "./Home/Posts/UserPhoto";
import "../styles/Profile.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const Following = ({ following, modal }) => {
  const history = useHistory();
  return following.map((item) => (
    <div
      id="followings"
      onClick={() => {
        M.Modal.getInstance(modal).close();
        history.push(`/profile/${item.userName}`);
      }}
    >
      <div className="followingitems card">
        <UserPhoto
          src={item.userDetails.profilePic}
          height="50px"
          width="50px"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold", fontSize: "17px" }}>
            {item.userName}
          </span>
          <span>{item.name}</span>
        </div>
      </div>
    </div>
  ));
};

export default Following;