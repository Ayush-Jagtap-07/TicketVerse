import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function AuthContainer() {

    const [toggle, setToggle] = useState(true);

    const handleSignUpClick = () => {
        setToggle(true);
    };

    const handleLoginInClick = () => {
        setToggle(false);
    };

    return (
        <div className="AuthContainer" id="AuthContainer">
            <div className="h1-container row mb-4">
                <div className='offset-md-4 offset-1 col-5 col-md-3' >
                    <h1 onClick={handleSignUpClick} className={toggle ? "" : "disabled"} >Signup</h1> </div>
                    <div className='col-md-3 col-5' >
                    <h1 onClick={handleLoginInClick} className={toggle ? "disabled" : ""} >Login</h1>
                    </div>
            </div>
            <div className="form-container">
                {toggle ? <SignupForm /> : <LoginForm />}
            </div>
        </div>
    );
}

export default AuthContainer;



