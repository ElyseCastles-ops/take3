import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp= () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signup} = useAuth();

    const clearPasswordFields = () => {
        setPassword("");
        setConfirmPassword("");
    }

    const handleSignup = async () => {
        //TODO: check that email entry is valid with @
        if (password === confirmPassword) {
            signup(email, password, dispatch, 10).then(() => {
                navigate("/")
            })
        } else {
            console.error("PASSWORDS DID NOT MATCH")
        }
        clearPasswordFields();
        
    }

    const handleGoToLogin = () => {
        navigate("/login")
    }
    
    // TODO: Add Error message display if passowrd do not match or error signingn up
    return (
        <div className="page-content">
            <div className="signup-box">
                <div className='mb-font-sm'>
                    <div className="signup-content">
                        <div id="signup-page-header">
                                    <h2>
                                        New Member
                                    </h2>
                                </div>
                        <div className="signup-body mb-d-flex mb-flex-col"> 
                            <div className='mb-d-flex mb-flex-col mb-align-items-center'>
                                <h3>Email</h3>
                                <input className="login-signup-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className='mb-d-flex mb-flex-col mb-align-items-center'>
                                <h3>Password</h3>
                                <div className='password-input mb-d-flex mb-flex-row mb-justify-start mb-align-items-center'>
                                    <input className="login-signup-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                    {/* <p className='mb-d-flex mb-align-items-center'>Forgot?</p> */}
                                </div>
                            </div>
                            <div className='mb-d-flex mb-flex-col mb-align-items-center'>
                                <h3>Confirm Password</h3>
                                <div className='password-input mb-d-flex mb-flex-row mb-justify-start mb-align-items-center'>
                                    <input className="login-signup-input" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                                    {/* <p className='mb-d-flex mb-align-items-center'>Forgot?</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="signup-footer mb-d-flex mb-flex-row mb-justify-between">
                            <button className="mb-button-primary mb-button-xl mb-back-color-black mb-font-color-white" onClick={handleSignup}><p>Signup</p></button>
                        </div>
                    </div>
                    <p>Already have an account? 
                        <span className='login-link' onClick={handleGoToLogin}> Login</span>
                    </p>
                </div>
            </div>
        </div>
        
        
    )
}

export default SignUp;