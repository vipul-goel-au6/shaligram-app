import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import Posts from "../Components/Home/Posts";
import Stories from "../Components/Stories/Stories";
import "../styles/Home.css";
import { GetFollowedPosts } from "../actions/PostActions/FollowedPost";
import Suggestions from "../Components/Suggestions";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);

  const [postState, setPostState] = useState(null);

  useEffect(() => {
    GetFollowedPosts().then((allPosts) => setPostState(allPosts));
  }, []);
if (!user.user) return <Redirect to="/signin"/>
  return postState ? (
    <div>
      <div className="home-main">
        <div className="home-left">
          <Stories
            postState={postState}
            user={user.user}
            setPostState={setPostState}
          />
          <Posts
            postState={postState}
            user={user}
            setPostState={setPostState}
          />
        </div>
        <div className="home-right">
          <Suggestions user={user.user}/>
        </div>
      </div>
    </div>
  ) : (
    <div className="progress">
      <div className="indeterminate"></div>
  </div>
  );
};


export default Home;


