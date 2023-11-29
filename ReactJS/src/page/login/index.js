import React, { useState } from 'react'
import LoginScreen from './Login'
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"

const Login = () => {

    const [ loginMethod, setloginMethod ] = useState('')
    
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async respose => {
            try {
              console.log(respose);
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    })

  return (
    <>
    <LoginScreen login={loginWithGoogle} />
    </>
  )
}

export default Login