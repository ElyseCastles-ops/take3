import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const navigate = useNavigate();
    //const dispatch = useDispatch();

    //const user = useSelector((state: RootState) => state.userManagement.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const {login} = useAuth();

    const handleLogin = async () => {
        
        await login(email, password)
        // loginEmailPassword(email, password, dispatch).then(() => {
        //     dispatch(goToHomePage(HOME_PAGE_SIGNED_IN))
        //     navigate("/")
        // })
        // if (await success) {
            
        //}
        navigate("/")
        
    }

    const handleGoToSignUp = () => {
        // dispatch(goToSignUpPage())
        navigate("/signup")
    }
    
    // TODO: Add Error message display if passowrd or user name is incorrect
    // TODO: Forgot password functionality
    return (
        <div className='page-content'>
            <div className='login-box'>
                <div className='mb-font-sm'>
                    <div className="login-content">
                        <div id="login-page-header">
                            <h2>
                                Already a Member
                            </h2>
                        </div>
                        <div className='login-body mb-d-flex mb-flex-col'>
                            <div className='mb-d-flex mb-flex-col mb-align-items-center'>
                                <h3>Email</h3>
                                <input className="login-signup-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className='mb-d-flex mb-flex-col mb-align-items-center'>
                                <h3>Password</h3>
                                <div className='password-input mb-d-flex mb-flex-row mb-justify-start mb-align-items-center'>
                                    <input className="login-signup-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                    <p className='mb-d-flex mb-align-items-center'>Forgot?</p>
                                </div>
                            </div>
                        </div>
                        <div className="login-footer mb-d-flex mb-flex-row mb-justify-between">
                            <button className="mb-button-primary mb-button-xl mb-back-color-black mb-font-color-white" onClick={handleLogin}><p>Login</p></button>
                        </div>
                    </div>
                        <p>Don't have an account yet? <span className='signup-link' onClick={handleGoToSignUp}>Create an account</span>
                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default Login;