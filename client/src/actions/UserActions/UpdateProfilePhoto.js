import { UPDATE_USERDETAILS } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";
export const UpdateProfilePhoto = async (dispatch, { form_data }) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.put(`/updatephoto`, form_data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: JWTaccessToken,
      },
    });
    if (data.error) {
      M.toast({ html: data.error, classes: "#d50000 red accent-4" });
    } else {
      M.toast({ html: data.message, classes: "#8bc34a light-green" });
    }
    dispatch({ type: UPDATE_USERDETAILS, payload: data.userDetails });
  } catch (err) {
    console.error(err);
  }
};

export const RemoveProfilePhoto = async (dispatch) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.put(`/removephoto`,{}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: JWTaccessToken,
      },
    });
    if (data.error) {
      M.toast({ html: data.error, classes: "#d50000 red accent-4" });
    } else {
      M.toast({ html: data.message, classes: "#8bc34a light-green" });
    }
    dispatch({ type: UPDATE_USERDETAILS, payload: data.userDetails });
  } catch (err) {
    console.error(err);
  }
};
