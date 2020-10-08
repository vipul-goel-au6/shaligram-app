import React from 'react';
import "../../styles/Signup.css"

const AuthCard = (props) => {
    return (
        <div className="mycard">
            <div className="authcard">
                {props.children}
            </div>
        </div>
    );
};

export default AuthCard;