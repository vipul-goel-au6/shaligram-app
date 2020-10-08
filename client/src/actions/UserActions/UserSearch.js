import axios from "axios";
  
export const UserSearch = async (query) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `/search?q=${query}`,
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