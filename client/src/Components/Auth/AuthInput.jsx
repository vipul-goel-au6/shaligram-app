import React from 'react';
import "../../styles/Signup.css"

const AuthInput =   ({handleChange, ...restProps}) => {
    
    return (
        <input className="validate" {...restProps} onChange={(e)=>handleChange(e.target.value)}/>
    );
};

export default AuthInput;