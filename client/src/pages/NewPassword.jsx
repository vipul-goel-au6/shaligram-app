import React, { useContext, useState } from "react";
import "../styles/Signup.css";
import M from "materialize-css";
import {Redirect, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { UpdatePassword } from "../actions/authActions/UpdatePassword";

const NewPassword = () => {
  const { user } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory()
  const {token} = useParams()

  const handleSubmit = () => {
      if (password !== confirmPassword) return M.toast({ html: "Both password shold be same", classes: "#d50000 red accent-4" });
      UpdatePassword({password, token}).then(msg => history.push("/signin"))
  };

  if (user.user) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{height:"350px",width:"30vmax",margin:"auto",border:"1px solid grey"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2>Shaligram</h2>
        <span style={{fontSize:"1.4vmax"}}>Update your password </span>
        <input style={{boxShadow:"unset !important",border:"1px solid grey ",width:"80%"}}
          type="password"
          placeholder="enter a new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input style={{boxShadow:"unset !important",border:"1px solid grey ",width:"80%"}}
          type="password"
          placeholder="confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button style={{marginTop:"20px"}}
          className="btn waves-effect waves-light #0288d1 light-blue darken-2"
          onClick={handleSubmit}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
