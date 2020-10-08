import React, { useState, useEffect, useRef } from "react";
import Stories from "react-insta-stories";
import "../../styles/Home.css";
import M from "materialize-css";
import UserPhoto from "../Home/Posts/UserPhoto";
import {
  UploadStory,
  GetStory,
} from "../../actions/storiesActions/UploadStory";
import AddStoryModal from "./AddStoryModal";
import "../../styles/Stories.css";
import CircleLoader from "../CircleLoader";

const StoriesComponent = () => {
  const [postfile, setPostFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState(null);

  const addStoryModal = useRef(null);
  const storyModal = useRef(null);

  useEffect(() => {
    M.Modal.init(addStoryModal.current);
    M.Modal.init(storyModal.current);
  }, []);

  useEffect(() => {
    GetStory().then((data) => setStories(data));
  }, [isLoading]);
  console.log(stories);
  const PostStory = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const form_data = new FormData();
      form_data.append("storyfiles", postfile);
      await UploadStory(form_data);
      setIsLoading(false);
      M.Modal.getInstance(addStoryModal.current).close();
    } catch (err) {
      console.log(err);
    }
  };

  const setStoryFunc = (storyArr) => {
    const modifiedStoryArr = storyArr.map((story) => {
      return {
        url: story.fileUrl,
        type: story.type,
        header: {
          heading: story.postedby.name,
          profileImage: story.postedby.userDetails.profilePic,
        },
      };
    });
    setStory(modifiedStoryArr);
  };

  const addButtonStyle = {
    height: "70px",
    width: "70px",
    border: "1px solid #c13584",
    borderRadius: "50%",
    marginLeft: "10px",
    background: "#405de6",
  };

  const userPhotoStyle = {
    height: "70px",
    width: "70px",
    border: "1px solid #c13584",
    borderRadius: "50%",
    marginLeft: "10px",
  };

  return (
    <div>
      <div className="card status-card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            className="modal-trigger"
            data-target="add-story-modal"
            style={addButtonStyle}
          >
            <i className="material-icons small white-text">add</i>
          </button>
          <span>Add Story</span>
        </div>
        {stories ? (
          stories.map(
            (story) =>
              story.length !== 0 && (
                <div
                  key={story._id}
                  style={{ textAlign: "center" }}
                  className="modal-trigger"
                  data-target="story-modal"
                  onClick={() => setStoryFunc(story)}
                >
                  <UserPhoto
                    src={
                      story[0] ? story[0].postedby.userDetails.profilePic : null
                    }
                    {...userPhotoStyle}
                  />
                  <span>{story[0] ? story[0].postedby.userName : null}</span>
                </div>
              )
          )
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      <div ref={addStoryModal} id="add-story-modal" className="modal">
        {!isLoading ? (
          <AddStoryModal PostStory={PostStory} setPostFile={setPostFile} />
        ) : (
          <CircleLoader />
        )}
      </div>
      <div ref={storyModal} id="story-modal" className="modal">
        {story ? (
          <Stories
            stories={story}
            onAllStoriesEnd={() =>
              M.Modal.getInstance(storyModal.current).close()
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default StoriesComponent;
