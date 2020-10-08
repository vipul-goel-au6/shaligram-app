import axios from "axios";
export const GetAllPosts = async () => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`/allposts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: JWTaccessToken,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };