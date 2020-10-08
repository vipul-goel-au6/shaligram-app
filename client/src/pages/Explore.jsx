import React, { useState, useEffect } from "react";
import M from "materialize-css";
import PostPopUp from "../Components/PostPopUp";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useRef } from "react";
import { GetAllPosts } from "../actions/PostActions/AllPosts";

const Explore = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const exploreModal = useRef(null);

  useEffect(() => {
    M.Modal.init(exploreModal.current);
  }, []);

  useEffect(() => {
    GetAllPosts().then((allPosts) => setPosts(allPosts));
  }, []);

  return (
    <>
      <div className="profile-gallary">
        {posts ? (
          posts.map((post) =>
            post.fileUrl.includes(".jpg") || post.fileUrl.includes(".png") ? (
              <div>
                <img
                  className="gallary-item modal-trigger"
                  data-target="explore-modal"
                  key={post._id}
                  alt={post.title}
                  src={post.fileUrl}
                  onClick={() => setPostContent(post)}
                />
              </div>
            ) : (
              <video
                className="gallary-item modal-trigger"
                data-target="explore-modal"
                key={post._id}
                onClick={() => setPostContent(post)}
              >
                <source className="gallary-item" src={post.fileUrl} />
              </video>
            )
          )
        ) : (
          <div className="progress">
            <div class="indeterminate"></div>
          </div>
        )}
      </div>
      <div ref={exploreModal} id="explore-modal" className="modal mymodal">
        {postContent ? (
          <PostPopUp
            post={postContent}
            posts={posts}
            user={user.user}
            setPosts={setPosts}
            setPost={setPostContent}
            modal={exploreModal.current}
          />
        ) : null}
      </div>
    </>
  );
};

export default Explore;
