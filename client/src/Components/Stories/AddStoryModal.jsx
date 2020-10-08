import React from "react";
import "../../styles/Stories.css"

const AddStoryModal = ({ setPostFile, PostStory }) => {
  return (
    <div className="input-field post-input">
      <h4 id="storytitle">
        Add a Story
      </h4>
      <form encType="multipart/form-data">
        <div className="file-field input-field">
          <div className="btn #0288d1 light-blue darken-2">
            <span>Upload</span>
            <input
              type="file"
              name="storyfiles"
              onChange={(e) => setPostFile(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          type="submit"
          className="btn waves-effect waves-light #0288d1 light-blue darken-2"
          onClick={(e) => PostStory(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStoryModal;
