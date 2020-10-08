// import { SET_USER, TOGGLEFETCHINGSTATE } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";
export const UpdatePassword = async ({ password, token }) => {
    try {
      const { data } = await axios.post(
        `/update-password`,
        {
          password,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
  