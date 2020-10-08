import axios from "axios";
import M from "materialize-css";
import { UPDATE_OTP_SECRET } from "../../actionTypes";
export const ResendOTP = async (dispatch, name, email, phoneNumber, mode) => {
  try {
    if (!mode) {
      M.toast({
        html: "something went wrong, try again later",
        classes: "#d50000 red accent-4",
      });
    }
    const { data } = await axios.post(`/resend-otp`, {
      name,
      email,
      phoneNumber,
      mode,
    });
    if (!data.success) {
      M.toast({ html: data.error, classes: "#d50000 red accent-4" });
    } else {
        M.toast({ html: data.message, classes: "#8bc34a light-green" });
        dispatch({ type: UPDATE_OTP_SECRET, payload: data.otpSecret });
    }
  } catch (err) {
    M.toast({
      html: "Something went Wrong, try again later",
      classes: "#d50000 red accent-4",
    });
    console.error(err);
  }
};
