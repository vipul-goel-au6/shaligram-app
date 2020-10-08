import React, { useEffect, useState, useContext } from "react";
import "../styles/Profile.css";
import { useParams, useHistory } from "react-router-dom";
import { ShowOtherUser } from "../actions/ProfileActions/UserProfile";
import { FollowUser} from "../actions/UserActions/Follow";
import { UnFollowUser } from "../actions/UserActions/Unfollow";

import { UserContext } from "../contexts/userContext";

const OtherUser = () => {
  const {user, dispatch } = useContext(UserContext);

  const [userState, setUserState] = useState(null);
  const { userId } = useParams();

  const history = useHistory()

  useEffect(() => {
    ShowOtherUser(userId).then((user) => {
      console.log(user)
      setUserState(user);
    });
  }, []);

  const followUser = async () => {
    const user = await FollowUser(dispatch,userId);
    setUserState((prevState) => {
      return { ...prevState, user: user}
    })
  };

  const unfollowUser = async () => {
    const user = await UnFollowUser(dispatch,userId);
    setUserState((prevState) => {
      return { ...prevState, user: user}
    })
  };

  const sendMessage = () => {
    history.push(`/chat/${userId}`)
  }

  return (
    <>
      {userState ? (
        <div className="outer-profile-div">
          <div className="profile">
            <div>
              <img
                alt=""
                className="profile-pic"
                src={userState.user.userDetails.profilePic}
              />
            </div>
            <div>
              <h4>{userState.user.name}</h4>
              <h5>{userState.user.email}</h5>
              <div className="profile-details">
                <h6>{userState.posts.length} Posts</h6>
                <h6>{userState.user.userDetails.followers.length} Followers</h6>
                <h6>{userState.user.userDetails.following.length} Following</h6>
              </div>
              {user.user.userDetails.following.includes(userId) ?
              <button
                className="btn waves-effect waves-light #0288d1 light-blue darken-2"
                onClick={unfollowUser}
              >
                Unfollow
              </button>
              : <button
              className="btn waves-effect waves-light #0288d1 light-blue darken-2"
              onClick={followUser}
            >
              Follow
            </button>}
            <button
              className="btn waves-effect waves-light #0288d1 light-blue darken-2"
              onClick={sendMessage}
            >
              message
            </button> 
            </div>
          </div>
          <div className="profile-gallary">
            {userState.posts.map((post) => (
              <img
                key={post._id}
                alt={post.title}
                className="gallary-item"
                src={post.fileUrl}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};

export default OtherUser;
