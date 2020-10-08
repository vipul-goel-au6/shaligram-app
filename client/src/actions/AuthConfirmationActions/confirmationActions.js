import { TOGGLEFETCHINGSTATE, SET_USER } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";

export const ConfirmOtp = async (dispatch, { token, otpSecret }) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: TOGGLEFETCHINGSTATE });
    const { data } = await axios.get(`/confirm-otp?otp=${token}`, {
      headers: {
        Authorization: JWTaccessToken,
        "Content-Type": "application/json",
        otpsecret: otpSecret,
      },
    });
    if (data.error) {
      M.toast({ html: data.error, classes: "#d50000 red accent-4" });
    } else {
      M.toast({ html: data.message, classes: "#8bc34a light-green" });
    }
    dispatch({ type: SET_USER, payload: data });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: TOGGLEFETCHINGSTATE });
  }
};

export const ResetPassword = async ({ email }) => {
  try {
    const { data } = await axios.post(
      `/reset-password`,
      {
        email,
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
