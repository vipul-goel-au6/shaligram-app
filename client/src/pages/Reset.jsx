import React, { useContext, useState } from "react";
import "../styles/Signup.css";
import {Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { ResetPassword } from "../actions/AuthConfirmationActions/confirmationActions";

const Reset = () => {
  const { user } = useContext(UserContext);
  const history = useHistory()
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    ResetPassword({email}).then(msg => history.push("/signin"))
  };

  if (user.user) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{height:"300px",width:"30vmax",margin:"auto",border:"1px solid grey"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2>Shaligram</h2>
        <span style={{fontSize:"1.2vmax"}}>Enter your registered email or phone number </span>
        <input style={{boxShadow:"unset !important",border:"1px solid grey ",width:"80%"}}
          type="text"
          placeholder="email or phone number"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={{marginTop:"10px"}}
          className="btn waves-effect waves-light #0288d1 light-blue darken-2"
          onClick={handleSubmit}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Reset;
