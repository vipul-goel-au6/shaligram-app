import axios from "axios";
export const GetFollowedPosts = async () => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`/followedposts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: JWTaccessToken,
        },
      });
      return data.posts;
    } catch (err) {
      console.error(err);
    }
  };