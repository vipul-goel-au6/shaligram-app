import axios from "axios";

export const GetMyPosts = async () => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`/myposts`, {
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