import React, { useContext, useEffect, useState } from "react";
import { ShowOtherUser } from "../actions/ProfileActions/UserProfile";
import M from "materialize-css";
import "../styles/Profile.css";
import { Link, useParams, useHistory } from "react-router-dom";
import UserPhoto from "../Components/Home/Posts/UserPhoto";
import PostPopUp from "../Components/PostPopUp";
import "../styles/PostPopUp.css";
import { useRef } from "react";
import Followers from "../Components/Followers";
import Following from "../Components/Following";
import { UserContext } from "../contexts/userContext";
import { FollowUser } from "../actions/UserActions/Follow";
import { UnFollowUser } from "../actions/UserActions/Unfollow";

const Profile = () => {
  const {user: userContext, dispatch} = useContext(UserContext)

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const postModal = useRef(null);
  const followerModal = useRef(null);
  const followingModal = useRef(null);

  const { userName } = useParams();

  const history = useHistory()

  useEffect(() => {
    M.Modal.init(postModal.current);
  }, []);
  useEffect(() => {
    M.Modal.init(followerModal.current);
  }, []);
  useEffect(() => {
    M.Modal.init(followingModal.current);
  }, []);

  useEffect(() => {
    setUser(null)
    setPosts(null)
    setPostContent(null)
    ShowOtherUser(userName).then((response) => {
      setPosts(response.posts);
      setUser(response.user);
    });
  }, [userName]);

  const followUser = async () => {
    const response = await FollowUser(dispatch,user._id);
    setUser(response)
  };

  const unfollowUser = async () => {
    const response = await UnFollowUser(dispatch,user._id);
    setUser(response)
  };

  const sendMessage = () => {
    history.push(`/chat/${user._id}`)
  }


  return (
    <div className="outer-profile-div">
      {user ? (
        <div className="profile">
          <div className="profile-pic">
            <UserPhoto
              height="12vmax"
              width="12vmax"
              src={user.userDetails.profilePic}
            />
          </div>
          <div className="details-div">
            <div className="profile-name">
              <span className="username">{user.userName}</span>
              {user._id !== userContext.user._id ? <div>
            {userContext.user.userDetails.following.includes(user._id) ?
              <button
                className="btn waves-effect waves-light transparent"
                onClick={unfollowUser}
              >
                Unfollow
              </button>
              : <button
              className="btn waves-effect waves-light transparent"
              onClick={followUser}
            >
              Follow
            </button>}
            <button style={{marginLeft:"20px"}}
              className="btn waves-effect waves-light transparent"
              onClick={sendMessage}
            >
              message
            </button>
            </div> : 
              <Link to="/editprofile">
                <button className="btn waves-effect waves-light transparent">
                  Edit Profile
                </button>
              </Link>}
            </div>

            <div className="profile-details">
              <h6><b>{posts ? posts.length : 0} </b>Posts</h6>
              <h6 className="modal-trigger" data-target="follower-modal">
                <b>{user.userDetails.followers.length}</b> Followers
              </h6>
              <h6 className="modal-trigger" data-target="following-modal">
                <b>{user.userDetails.following.length}</b> Following
              </h6>
            </div>
            <h6>{user.name}</h6>
            <span>{user.userDetails.bio}</span>
          </div>
        </div>
      ) : (
        <div className="progress">
          <div class="indeterminate"></div>
        </div>
      )}
      {posts ? (
        <div className="profile-gallary">
          {posts.map((post) =>
            post.fileUrl.includes(".jpg") || post.fileUrl.includes(".png") ? (
              <div>
                <img
                  className="gallary-item modal-trigger"
                  data-target="post-modal"
                  key={post._id}
                  alt={post.title}
                  src={post.fileUrl}
                  onClick={() => setPostContent(post)}
                />
              </div>
            ) : (
              <video
                className="gallary-item modal-trigger"
                data-target="post-modal"
                key={post._id}
                onClick={() => setPostContent(post)}
              >
                <source className="gallary-item" src={post.fileUrl} />
              </video>
            )
          )}
        </div>
      ) : null}
      <div ref={postModal} id="post-modal" className="modal mymodal">
        {postContent ? (
          <PostPopUp
            post={postContent}
            posts={posts}
            user={user}
            setPosts={setPosts}
            setPost={setPostContent}
            modal={postModal.current}
          />
        ) : null}
      </div>
      <div
        ref={followerModal}
        id="follower-modal"
        className="modal myfollowermodal"
      ><h5 style={{textAlign: "center"}}>Followers</h5>
        {user ? <Followers followers={user.userDetails.followers} modal={followerModal.current}/> : null}
      </div>
      <div
        ref={followingModal}
        id="following-modal"
        className="modal myfollowingmodal"
      ><h5 style={{textAlign: "center"}}>Followings</h5>
        {user ? <Following following={user.userDetails.following} modal={followingModal.current}/> : null}
      </div>
    </div>
  );
};

export default Profile;