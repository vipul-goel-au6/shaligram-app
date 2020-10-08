import axios from "axios";

export const GetPosts = async (userName) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`/posts/${userName}`, {
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