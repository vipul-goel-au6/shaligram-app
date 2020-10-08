import axios from "axios";
  
export const FollowSuggestions = async () => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `/suggestion`,
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