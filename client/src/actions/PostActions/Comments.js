import axios from "axios";
export const PostComment = async ({ postId, text }) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.put(
        `/comment`,
        {
          postId,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JWTaccessToken,
          },
        }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };