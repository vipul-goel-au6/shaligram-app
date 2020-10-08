import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { ConfirmOtp } from "../actions/AuthConfirmationActions/confirmationActions";
import { Redirect } from "react-router-dom";
import "../styles/ConfirmEmail.css";
import AuthButton from "../Components/Auth/AuthButton";
import AuthInput from "../Components/Auth/AuthInput";
import { ResendOTP } from "../actions/authActions/ResendOtp";

const ConfirmEmail = () => {
  const { user, dispatch } = useContext(UserContext);

  const [{ minutes, seconds }, setTimer] = useState({
    minutes: 2,
    seconds: 0,
  });
  const [token, setToken] = useState("");
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(String(token).length === 4){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  }, [token])

  useEffect(() => {
    if (seconds === 0 && minutes === 0) return;
    const timeInterval = setInterval(() => {
      if (seconds > 0) {
        setTimer({ minutes, seconds: seconds - 1 });
      }
      if (seconds === 0) {
        setTimer({ minutes: minutes - 1, seconds: 59 });
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [minutes, seconds]);

  const handleConfirmOtp = (e) => {
    e.preventDefault();
    const otpSecret = user.user.otpSecret || null;
    ConfirmOtp(dispatch, { token, otpSecret });
  };

  const handleResendOtp = async(e) => {
    let mode;
    user.user.otpSecret ? (mode = "email") : (mode = "phoneNumber");
    await ResendOTP(dispatch, user.user.name, user.user.email, user.user.phoneNumber, mode);
    setTimer({minutes: 2, seconds: 0})
  };

  if (!user.user || !user.user.success) {
    return <Redirect to="/signin" />;
  } else if (user.user.isVerified) {
    return <Redirect to="/" />;
  }

  return (
    <div id="mycard">
      <div className="card otpcard">
        <span style={{ fontWeight: "bold", fontSize: "2.5vmax" }}>
          ENTER OTP
        </span>
        <span style={{ fontSize: "1vmax" }}>
          Check your registered email or phone number for otp
        </span>
        <span style={{ fontSize: "2vmax" }}>OTP Expires in </span>
        <span style={{ fontSize: "2vmax" }}>
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds} s
        </span>
        <form onSubmit={(e) => handleConfirmOtp(e)}>
          <div className="input-field">
            <AuthInput
              type="number"
              placeholder="one time password"
              className="input-area"
              required={true}
              handleChange={setToken}
            />
          </div>
          <AuthButton type="submit">Confirm OTP</AuthButton>
        </form>
        <div style={{ width: "20vmax", marginTop: "1vmax" }}>
          <AuthButton handleClick={handleResendOtp}>Resend OTP</AuthButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
