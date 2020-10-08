import React, { useState, useEffect } from "react";
import UserPhoto from "./Home/Posts/UserPhoto";
import { FollowSuggestions } from "../actions/UserActions/FollowSuggestions";
import "../styles/Suggestions.css"
import { Link } from "react-router-dom";

const Suggestions = ({ user }) => {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    FollowSuggestions().then((data) => setSuggestions(data));
  }, []);

  return (
    <div className="suggestions">
      <div className="suggesteduser">
        <UserPhoto
          src={user.userDetails.profilePic}
          height="80px"
          width="80px"
        />
        <Link to={"/profile/"+ user.userName} >
        <div className="usernames">
          <span style={{fontWeight:"bold"}}>{user.userName}</span>
          <span style={{color:"grey"}}>{user.name}</span>
        </div>
        </Link>
      </div>
      <div>
        <span style={{fontWeight:"bold",fontSize:"18px",color:"grey"}}>Suggestions For You</span>
      </div>
      <div>
        {suggestions
          ? suggestions.map(
              (followUser) =>
                followUser._id !== user._id && (
                    <Link
                    to={"/profile/" + followUser.userName
                    }>
                  <div key={followUser._id} className="suggesteduser">
                    <UserPhoto
                      src={followUser.userDetails.profilePic}
                      height="50px"
                      width="50px"
                    />
                    <div className="usernames">
                      <span span style={{fontWeight:"bold"}}>{followUser.userName}</span>
                      <span style={{color:"grey"}}>{followUser.name}</span>
                    </div>
                  </div>
                  </Link>
                )
            )
          : null}
      </div>
    </div>
  );
};

export default Suggestions;
