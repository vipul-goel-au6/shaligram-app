import axios from "axios";
export const ShowOtherUser =  async (userName)=>{
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `/user/${userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JWTaccessToken,
          },
        }
      );
      return data
    } catch (err) {
      console.error(err);
    }
    }