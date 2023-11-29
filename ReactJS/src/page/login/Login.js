import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const LoginScreen = ({loginWithMeta,loginWithGoogle,loginWithApple}) => {
    return (
        <div>
            <h2>Welcome Back</h2>
            <text>Welcome Back, Please enter Your details</text><br/>
            <text><span>Sign In</span><span>Signup</span></text><br/>
            <input placeholder='Email Id' type='email' /><br/>
            <button>Continue</button><br/>
            <text>Or Continue With</text><br/>
            <GoogleIcon onClick={loginWithGoogle} />
            <AppleIcon onClick={loginWithApple} />
            <FacebookIcon onClick={loginWithMeta} />
        </div>
    )
}

export default LoginScreen