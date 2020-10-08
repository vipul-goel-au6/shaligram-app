import React from 'react';
import "../styles/EditProfile.css";
import { useState } from 'react';
import EditProfileComp from '../Components/EditProfileComp';
import ChangePassword from '../Components/ChangePassword';


const EditProile = () => {
  const [type, setType] = useState("edit profile")
    return (
        <div id="main-div">
          <div id="left-div">
            <div className="collection" style={{border: "none"}}> 
            <a className="collection-item" onClick={()=> setType("edit profile")
            }>Edit Profile</a>
            <a className="collection-item" onClick={()=> setType("change password")
            }>Change Password</a>
            
            </div>
            </div>
            <div style={{width:"15%"}}></div>
            
              <div className="right-div">
            { type === "edit profile" ? <EditProfileComp/> : <ChangePassword/>}
   
  </div>
  </div>
    );
};

export default EditProile;