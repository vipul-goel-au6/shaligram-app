import { SET_USER, TOGGLEFETCHINGSTATE } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";

export const SignIn = async (dispatch, { username, password }) => {
  try {
    dispatch({ type: TOGGLEFETCHINGSTATE });
    const { data } = await axios.post(
      `/signin`,
      { username, password },
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
    dispatch({ payload: data, type: SET_USER });
  } catch (err) {
    if(err.name === "Error"){
      M.toast({ html: "Invalid Credendials", classes: "#d50000 red accent-4" });
    }else{
      M.toast({ html: "Something went Wrong, try again later", classes: "#d50000 red accent-4" });
      console.error(err);
    }
  } finally {
    dispatch({ type: TOGGLEFETCHINGSTATE });
  }
};