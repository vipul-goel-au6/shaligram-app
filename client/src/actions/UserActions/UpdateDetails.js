import { UPDATE_USERDETAILS, UPDATE_NAME, EDIT_PROFILE } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";

export const UpdateUserDetails = async (dispatch, { name, bio, userName, email, phoneNumber }) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.put(
      `/updateuserdetails`,
      { name, bio, userName, email, phoneNumber },
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
    dispatch({type: EDIT_PROFILE, payload: data})
  } catch (err) {
    console.error(err);
  }
};
