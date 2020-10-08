import axios from "axios";
import M from "materialize-css";
export const DeletePost = async ({ postId}) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.delete(
        `/deletepost/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JWTaccessToken,
          },
        }
      );
      if (data.error) {
        M.toast({ html: data.error, classes: "#d50000 red accent-4" });
      } else {
        M.toast({ html: "post deleted succesfully", classes: "#8bc34a light-green" });
      }
      return data
    } catch (err) {
      console.error(err);
    }
  };