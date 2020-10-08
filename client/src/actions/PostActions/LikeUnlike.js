import axios from "axios";
export const LikeUnlikePost = async ({ postId, mode }) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.put(
        `/${mode}`,
        {
          postId,
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
  