import axios from "axios";
import M from "materialize-css";

export const ChangeUserPassword = async ({ oldPassword, newPassword }) => {
    try {
      const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.put(
        `/changepassword`,
        { oldPassword, newPassword },
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
        M.toast({ html: data.message, classes: "#8bc34a light-green" });
      }
    } catch (err) {
      console.error(err);
    }
  };