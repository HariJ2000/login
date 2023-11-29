import React from 'react'

const LoginScreen = ({login}) => {
    return (
        <div>
            <button onClick={login}>
                <i class="fa-brands fa-google"></i>
                Continue with google
            </button>
        </div>
    )
}

export default LoginScreen