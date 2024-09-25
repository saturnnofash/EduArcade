import React, { useState } from 'react';
import "./LoginSignup.css";

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

  return (
    <div className='login-container'>
        <div className="login-header">
            <div className="login-text">{action}</div>
            <div className="login-underline"></div>
        </div>
        <div className="login-inputs">
            {action==="Login"?<div></div>:<div className="login-input">
            <i className="ri-user-fill" style={{ color: '#797979' }}></i> 
                <input type="text" placeholder="Username"/>
            </div>}
            
            <div className="login-input">
            <i className="ri-mail-fill" style={{ color: '#797979' }}></i>
                <input type="email" placeholder="Email"/>
            </div>
            <div className="login-input">
            <i className="ri-lock-fill" style={{ color: '#797979' }}></i>
                <input type="password" placeholder="Password"/>
            </div>
        </div>
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{
                setAction("Sign Up")
            }}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{
                setAction("Login")
            }}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup;
